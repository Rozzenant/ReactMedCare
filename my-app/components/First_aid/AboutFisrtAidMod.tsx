import React from 'react';
// import { ObjectInt } from '../../Models/object';
import { Container,  Card, ListGroup } from "react-bootstrap";
import NavigationBar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';


const AboutfirstAid: React.FC = () => {
    const location = useLocation();
    const first_aid = location.state

    console.log(location.state)
    return (
            <>
      <NavigationBar />
      <Breadcrumbs />
      <Container
        fluid
        style={{ height: "100%" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Card style={{ width: "30%" }}>
          <Card.Img
            variant="top"
            className="mx-auto"
            src={first_aid.Image_URL}
            style={{
              width: "400px",
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
      </Container>
    </>

    )
}

export default AboutfirstAid