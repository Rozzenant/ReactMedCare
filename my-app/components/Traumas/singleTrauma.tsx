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




  return (
    <>
      <NavigationBar />
        <Container style={{ minHeight: '100vh' }}>
          <h2>Информация об поражении #{id}</h2>
          {trauma && (
            <Card>
              <Card.Body>
                <Card.Title>{trauma.Trauma_Name || 'Нет наименования'}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">ID: {trauma.Trauma_ID}</Card.Subtitle>
                <Card.Text>
                  <strong>Confirmation_Doctor:</strong> {trauma.Confirmation_Doctor || '-'}<br />
                  <strong>Date Creation:</strong> {trauma.Date_Creation || '-'}<br />
                  <strong>Date Approving:</strong> {trauma.Date_Approving || '-'}<br />
                  <strong>Date End:</strong> {trauma.Date_End || '-'}<br />
                  <strong>Status:</strong> {trauma.Status}<br />
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