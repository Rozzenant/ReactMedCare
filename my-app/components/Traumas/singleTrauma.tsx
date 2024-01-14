import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Container, Card } from 'react-bootstrap';
import NavigationBar from "../Navbar/Navbar";

const SingleTrauma: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const trauma = useSelector((state: RootState) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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