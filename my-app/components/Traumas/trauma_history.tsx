import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Container, Table, Form, Button} from 'react-bootstrap';
import {RootState} from '../../store/store';
import NavigationBar from "../Navbar/Navbar";
import {Link} from 'react-router-dom';
import {
    setTraumas,
    setFromDate, setToDate,
    setSearch, setStatus, removeParams
} from "../../store/TraumaSlice.ts"
import axios from "axios";
import TraumaButton from "./TraumaAction.tsx";

const TraumaHistory: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const userTraumas = useSelector((state: RootState) => state.traumas);
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false)
    // const [countFlag, setCountFlag] = useState(0)


    const filterTraumas = (search: string) => {
        dispatch(setSearch(search))
        if (userTraumas.traumas.length > 0) {
            const filteredData = userTraumas.traumas.filter(
                (trauma) => {
                    return trauma.Creator_Name.toLowerCase().includes(search.toLowerCase());
                }
            );
            dispatch(setTraumas(filteredData));
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
              dataFrom: userTraumas.from,
              dataTo: userTraumas.to,
              Status: userTraumas.status === "Все статусы" ? '' : userTraumas.status
            },
          }
        );
        if (response.status === 200) {
            dispatch(setTraumas(response.data));
        }

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
                    <Form.Group style={{"display": "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginBottom: "10px"}} >
                      <Form.Label>Поиск по пользователю </Form.Label>
                      <Form.Control
                        className="text-center"
                        value={userTraumas.search}
                        onChange={(e) => filterTraumas(e.target.value)}
                        style={{"width": ""}}
                      />

                      <Form.Label>От</Form.Label>
                      <Form.Control
                        className="text-center"
                        type="datetime-local"
                        value={userTraumas.from}
                        onChange={(e) => {
                            dispatch(setFromDate(e.target.value))}}
                        style={{"width": "800px"}}
                      />
                        <Form.Label>До</Form.Label>
                        <Form.Control
                        className="text-center"
                        type="datetime-local"
                        value={userTraumas.to}
                        onChange={(e) => {
                            dispatch(setToDate(e.target.value))}}
                        style={{"width": "800px"}}
                      />

                            <Form.Control
                                as="select"
                                value={userTraumas.status}
                                onChange={(e) => {
                                dispatch(setStatus(e.target.value))}}
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
                                filterTraumas(userTraumas.search);
                                setFlag(!flag);
                                // setCountFlag(countFlag + 1);
                            }
                    }>
                        Искать
                    </Button>
                    <Button className="button-style"
                            onClick={() => {
                                dispatch(removeParams());
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
          {userTraumas.traumas && userTraumas.traumas.filter(trauma => trauma.Creator_Name.toLowerCase().includes(userTraumas.search.toLowerCase())).length > 0 ? (
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th>Номер</th>
                    {user.Is_Super ? (
                        <th>Обучающийся</th>
                    ) : null}
                  <th>Поражение</th>
                  <th>Создано</th>
                  <th>Утверждено</th>
                  <th>Завершено</th>
                  {user.Is_Super ? (
                        <th>Эксперт медицины катастроф</th>
                    ) : null}
                  <th>Статус</th>
                  <th>Подтверждение врача общей практики</th>
                  {user.Is_Super ? (
                      <th>Действие</th>
                  ) : (
                      <></>
                  )}

                </tr>
              </thead>
              <tbody>
                {userTraumas.traumas.filter(trauma => trauma.Creator_Name.toLowerCase().includes(userTraumas.search.toLowerCase())).slice().reverse().map((trauma) => (
                  <tr key={trauma.Trauma_ID}>
                    <td>
                      <Link to={`/trauma/${trauma.Trauma_ID}`}>
                        {trauma.Trauma_ID}
                      </Link>
                    </td>
                    {user.Is_Super ? (
                        <td>{trauma.Creator_Name}</td>
                    ) : null}
                    <td>{trauma.Trauma_Name || 'Не названо'}</td>
                    <td>{formatDateTime(trauma.Date_Creation)}</td>
                    <td>{formatDateTime(trauma.Date_Approving) || '-'}</td>
                    <td>{formatDateTime(trauma.Date_End) || '-'}</td>
                    {user.Is_Super ? (
                        <td>{trauma.Moderator_Name || "-"}</td>
                    ) : null}
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