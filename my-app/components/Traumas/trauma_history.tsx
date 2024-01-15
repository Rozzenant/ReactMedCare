import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Container, Table, Form, Button} from 'react-bootstrap';
import {RootState} from '../../store/store';
import NavigationBar from "../Navbar/Navbar";
import {Link} from 'react-router-dom';
import {removeTraumas, setTraumas} from '../../store/TraumaSlice.ts'
import axios from "axios";
import TraumaButton from "./TraumaAction.tsx";

const TraumaHistory: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const userTraumas = useSelector((state: RootState) => state.traumas);
    const dispatch = useDispatch();
    const [filteredTraumas, setFilteredTraumas] = useState(userTraumas.traumas);
    const [search, setSearch] = useState('');
    const [dataFrom, setDataFrom] = useState('');
    const [dataTo, setDataTo] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('')
    const [flag, setFlag] = useState(false)
    const [countFlag, setCountFlag] = useState(0)

    // interface FirstAidInt {
    //   First_aid_ID: number;
    //   First_aid_Name?: string;
    //   Description?: string;
    //   Image_URL?: string;
    //   Price?: number;
    // }

    // interface TraumaInt {
    //   Trauma_ID?: number;
    //   Trauma_Name?: string | null;
    //   Status?: string;
    //   Date_Creation?: string;
    //   Date_Approving?: string | null;
    //   Date_End?: string | null;
    //   Moderator_Name?: number | null;
    //   Creator_Name: string;
    //   First_aid_in_Trauma_List?: FirstAidInt[];
    //   Confirmation_Doctor?: string;
    // }

    const filterTraumas = (search: string) => {
        setSearch(search)
        if (!(userTraumas.traumas['detail'] === undefined )){
            const filteredData = userTraumas.traumas.filter(
                (trauma) => {
                    return trauma.Creator_Name.toLowerCase().includes(search.toLowerCase());
                }
        );
        setFilteredTraumas(filteredData);
        }

  };

    function formatDateTime(DateTime: string | undefined | null) {
        if (!DateTime) {
            return '-';
        }
        return new Date(DateTime).toLocaleString('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
      });
    }

const statusOptions = [
    { value: 'Formed', label: 'Сформировано' },
    { value: 'Completed', label: 'Завершёно' },
    { value: 'Cancelled', label: 'Отклонено' },
];
    function statusMap(status: keyof typeof statusMap){
        const StatusMap = {
        Draft: 'Черновик',
        Formed: 'Сформировано',
        Completed: 'Завершёно',
        Cancelled: 'Отклонено',
        Deleted: 'Удалёно',
        };

        return StatusMap[status] || status;
    }

    function doctorStatusMap(status: keyof typeof doctorStatusMap) {
        const DoctorStatusMap = {
        Pending: 'Ожидается',
        Confirmed: 'Подтверждено',
        Rejected: 'Отклонено',
  };

  return DoctorStatusMap[status] || status;
}

  useEffect(() => {
    const getTraumas = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/trauma/",
          {
            withCredentials: true,
            headers: {
              'Authorization': `${user.jwt}`,
              'Content-Type': 'application/json',
            },
            params: {
              dataFrom: dataFrom,
              dataTo: dataTo,
              Status: selectedStatus
            },
          }
        );
        dispatch(removeTraumas());
        if (response.status === 200) {
            // const filteredData = response.data.filter(
            //     (trauma: TraumaInt) => {
            //         return trauma.Creator_Name.toLowerCase().includes(search.toLowerCase())
            //     }
            //
            //
            // )

            dispatch(setTraumas(response.data));
            setFilteredTraumas(response.data);
        }

        // response.data.forEach((trauma: TraumaInt) => {
        // if (trauma.Creator_Name.toLowerCase().includes(search.toLowerCase())) {
        //   filteredTraumas.push(trauma);
        // }
        //
        // dispatch(setTraumas(response.data));
        // });

      } catch (error) {
        console.error(error);
      }
    };

    getTraumas();

    const short_poling = setInterval(() => {
        getTraumas();
    }, 5000);

    return () => {
      clearInterval(short_poling);
    };
  }, [flag]);
  return (
    <>
      <NavigationBar />
      <div>
        <Container fluid style={{ minHeight: '100vh' }} >
          <h1 className="text-center">История Поражений</h1>
            {user.Is_Super ? (
                <Container style={{"width": "100%"}}>
                  {/*<label style={{"marginRight": "10px"}} htmlFor="creatorSearch">Поиск по пользователю </label>*/}
                  {/*<input*/}
                  {/*  type="text"*/}
                  {/*  id="creatorSearch"*/}
                  {/*  value={search}*/}
                  {/*  onChange={(e) => filterTraumas(e.target.value)}*/}
                  {/*/>*/}
                    <Form.Group style={{"display": "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginBottom: "10px"}} >
                      <Form.Label>Поиск по пользователю </Form.Label>
                      <Form.Control
                        className="text-center"
                        value={search}
                        onChange={(e) => filterTraumas(e.target.value)}
                        style={{"width": ""}}
                      />

                      <Form.Label>От</Form.Label>
                      <Form.Control
                        className="text-center"
                        type="datetime-local"
                        value={dataFrom}
                        onChange={(e) => {setDataFrom(e.target.value)}}
                        style={{"width": "800px"}}
                      />
                        <Form.Label>До</Form.Label>
                        <Form.Control
                        className="text-center"
                        type="datetime-local"
                        value={dataTo}
                        onChange={(e) => {setDataTo(e.target.value)}}
                        style={{"width": "800px"}}
                      />

                            <Form.Control
                                as="select"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="">Все статусы</option>
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Control>

                    <Button className="button-style"
                            onClick={() => {
                                filterTraumas(search);
                                setFlag(!flag);
                                setCountFlag(countFlag + 1);
                            }
                    }>
                        Искать
                    </Button>
                    <Button className="button-style"
                            onClick={() => {
                                setSearch('');
                                setDataFrom('');
                                setDataTo('');
                                setSelectedStatus('');
                                // setFlag(!flag)
                            }}>
                        Очистить
                    </Button>
                    </Form.Group>

                    {/*<button onClick={() => filterTraumas(search)}>Искать</button>*/}
              </Container>
                      ) : (
                          <></>
                      )}
          {filteredTraumas.length > 0 ? (
            <Table striped bordered hover responsive variant="light">
              <thead>
                <tr>
                  <th>Номер</th>
                  <th>Пользователь</th>
                  <th>Поражение</th>
                  <th>Создано</th>
                  <th>Утверждено</th>
                  <th>Завершено</th>
                  <th>Модератор</th>
                  <th>Статус</th>
                  <th>Подтверждение врача</th>
                  {user.Is_Super ? (
                      <th>Действие</th>
                  ) : (
                      <></>
                  )}

                </tr>
              </thead>
              <tbody>
                {filteredTraumas.filter(trauma => trauma.Creator_Name.toLowerCase().includes(search.toLowerCase())).slice().reverse().map((trauma) => (
                  <tr key={trauma.Trauma_ID}>
                    <td>
                      <Link to={`/trauma/${trauma.Trauma_ID}`}>
                        {trauma.Trauma_ID}
                      </Link>
                    </td>
                    <td>{trauma.Creator_Name}</td>
                    <td>{trauma.Trauma_Name || 'Не названо'}</td>
                    <td>{formatDateTime(trauma.Date_Creation)}</td>
                    <td>{formatDateTime(trauma.Date_Approving) || '-'}</td>
                    <td>{formatDateTime(trauma.Date_End) || '-'}</td>
                    <td>{trauma.Moderator_Name || "-"}</td>
                    <td>{statusMap(trauma.Status as keyof typeof statusMap)}</td>
                    <td style={{"height": "100px"}}>
                        {doctorStatusMap(trauma.Confirmation_Doctor as keyof typeof doctorStatusMap)}
                    </td>

                      {user.Is_Super ? (
                          <TraumaButton trauma={trauma}/>
                      ) : (
                          <></>
                      )}

                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info" className="mt-3">
              История пуста
            </Alert>
          )}
        </Container>
      </div>
    </>
  );
};

export default TraumaHistory;