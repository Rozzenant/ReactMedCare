import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Container, Table} from 'react-bootstrap';
import {RootState} from '../../store/store';
import NavigationBar from "../Navbar/Navbar";
import {Link} from 'react-router-dom';
import {removeTraumas, setTraumas} from '../../store/TraumaSlice.ts'
import axios from "axios";

const TraumaHistory: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const userTraumas = useSelector((state: RootState) => state.traumas);
    const dispatch = useDispatch();

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
    axios.get(
        "http://127.0.0.1:8000/trauma/",
        {
              withCredentials: true,
              headers: {
                  'Authorization': `${user.jwt}`,
                  'Content-Type': 'application/json',
              },
          }
    )
      .then((response) => {
        dispatch(removeTraumas())
        dispatch(setTraumas(response.data))
      })
      .catch((error) => {
        console.error(error);
      });
}, []);


  return (
    <>
      <NavigationBar />
      <div>
        <Container fluid style={{ minHeight: '100vh' }} className="text-center">
          <h1>История Поражений</h1>
          {userTraumas.traumas.length > 0 ? (
            <Table striped bordered hover responsive variant="light">
              <thead>
                <tr>
                  <th>Номер</th>
                  <th>Поражение</th>
                  <th>Создано</th>
                  <th>Завершено</th>
                  <th>Утверждено</th>
                  <th>Статус</th>
                  <th>Подтверждение врача</th>

                </tr>
              </thead>
              <tbody>
                {userTraumas.traumas.slice().reverse().map((trauma) => (
                  <tr key={trauma.Trauma_ID}>
                    <td>
                      <Link to={`/trauma/${trauma.Trauma_ID}`}>
                        {trauma.Trauma_ID}
                      </Link>
                    </td>
                    <td>{trauma.Trauma_Name || 'Не названо'}</td>
                    <td>{formatDateTime(trauma.Date_Creation)}</td>
                    <td>{formatDateTime(trauma.Date_End) || '-'}</td>
                    <td>{formatDateTime(trauma.Date_Approving) || '-'}</td>
                    <td>{statusMap(trauma.Status as keyof typeof statusMap)}</td>
                    <td>{doctorStatusMap(trauma.Confirmation_Doctor as keyof typeof doctorStatusMap)}</td>

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