import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Table, Alert } from 'react-bootstrap';
import { RootState } from '../../store/store';
import NavigationBar from "../Navbar/Navbar";
import { Link } from 'react-router-dom';
const TraumaHistory: React.FC = () => {
  const userTraumas = useSelector((state: RootState) => state.traumas.traumas);
  console.log(userTraumas)

  return (
    <>
      <NavigationBar />
      <div>
        <Container fluid style={{ minHeight: '100vh' }} className="text-center">
          <h1>История Поражений</h1>
          {userTraumas.length > 0 ? (
            <Table striped bordered hover responsive variant="light">
              <thead>
                <tr>
                  <th>Номер</th>
                  <th>Наименование</th>
                  <th>Дата начала</th>
                  <th>Дата окончания</th>
                  <th>Дата утверждения</th>
                  <th>Статус</th>
                  <th>Подтверждение врача</th>

                </tr>
              </thead>
              <tbody>
                {userTraumas.map((trauma) => (
                  <tr key={trauma.Trauma_ID}>
                    <td>
                      <Link to={`/trauma/${trauma.Trauma_ID}`}>
                        {trauma.Trauma_ID}
                      </Link>
                    </td>
                    <td>{trauma.Trauma_Name || 'Не названо'}</td>
                    <td>{trauma.Date_Creation}</td>
                    <td>{trauma.Date_End || '-'}</td>
                    <td>{trauma.Date_Approving || '-'}</td>
                    <td>{trauma.Status}</td>
                    <td>{trauma.Confirmation_Doctor}</td>

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