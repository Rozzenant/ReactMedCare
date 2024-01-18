import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../store/store';
import {Container, Card, ListGroup} from 'react-bootstrap';
import NavigationBar from "../Navbar/Navbar";
import axios from "axios";
// import setTraumas from "./traumas.tsx"

const SingleTrauma: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.user);
  // const dispatch = useDispatch();
  interface FirstAidInt {
  First_aid_ID: number;
  First_aid_Name?: string;
  Description?: string;
  Image_URL?: string;
  Price?: number;
}
  const [firstAids, setFirstAids] = useState<FirstAidInt[]>([]);
  const trauma = useSelector((state: RootState) => {
    return state.traumas.traumas.find(trauma => trauma.Trauma_ID.toString() === id);
  });


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

    function doctorStatusMap(status: keyof typeof doctorStatusMap) {
        const DoctorStatusMap = {
        Pending: 'Ожидается',
        Confirmed: 'Подтверждено',
        Rejected: 'Отклонено',
  };

  return DoctorStatusMap[status] || status;
}

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/trauma/${id}`,
          {
            withCredentials: true,
            headers: {
              'Authorization': `${user.jwt}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setFirstAids(response.data.First_aid_in_Trauma_List);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <NavigationBar />
        <Container style={{ minHeight: '100vh' }}>
          <h2>Информация об поражении #{id}</h2>
          {trauma && (
            <Card>
              <Card.Body>
                <Card.Title>{trauma.Trauma_Name || 'Нет названия поражения'}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">ID: {trauma.Trauma_ID}</Card.Subtitle>
                <Card.Text>
                  <strong>Словесное подтверждение врача: </strong> {doctorStatusMap(trauma.Confirmation_Doctor as keyof typeof doctorStatusMap) || '-'}<br />
                  <strong>Создано: </strong> {formatDateTime(trauma.Date_Creation) || '-'}<br />
                  <strong>Утверждено: </strong> {formatDateTime(trauma.Date_Approving) || '-'}<br />
                  <strong>Завершено: </strong> {formatDateTime(trauma.Date_End) || '-'}<br />
                  <strong>Статус: </strong>{statusMap(trauma.Status as keyof typeof statusMap)}<br />
                      {firstAids.map((first_aid) => (
                        <Card style={{ width: "100%" }} key={first_aid.First_aid_ID}>
                          <Card.Img
                            className="mx-auto"
                            src={first_aid.Image_URL}
                            style={{
                              width: "500px",
                              height: "300px",
                              objectFit: "cover",
                              marginTop: "15px",
                            }}
                          />
                          <Card.Body>
                            <Card.Title>{first_aid.First_aid_Name}</Card.Title>
                            <Card.Text>{first_aid.Description}</Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item style={{ textAlign: "center", fontSize: "1.25em" }}>
                              {first_aid.Price}$
                            </ListGroup.Item>
                          </ListGroup>
                        </Card>
                      ))}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Container>
    </>
  );
};
//
export default SingleTrauma;