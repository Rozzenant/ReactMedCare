// import React, {useEffect} from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import NavigationBar from "../Navbar/Navbar";
import {useLocation, useParams} from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.tsx";
import React, {useEffect, useState} from "react";
// import {response} from "express";
import { First_aid_Inter } from "../../Models/First_aid.tsx";
// import {mockObjects} from "../../src/assets/mockObject.ts";


const AboutFirst_aid: React.FC = () => {
  const location = useLocation();
  const { id } = useParams();
  const [first_aid_about, setFirstAidAbout] = useState<First_aid_Inter | null>(null);

  useEffect(() => {
    if (location.state === null) {
      fetch(`http://127.0.0.1:8000/first_aid/${id}`)
        .then(response => response.json())
        .then(data => {
          setFirstAidAbout(data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setFirstAidAbout(location.state.object);
    }
  }, [id, location.state]);

  if (!first_aid_about) {
    return <div>Загружаем...</div>;
  }
  console.log(first_aid_about)
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
            src={first_aid_about.Image_URL}
            style={{
              width: "400px",
              height: "300px",
              objectFit: "cover",
              marginTop: "15px",
            }}
          />
          <Card.Body>
            <Card.Title>{first_aid_about.First_aid_Name}</Card.Title>
            <Card.Text>{first_aid_about.Description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item style={{ textAlign: "center", fontSize: "1.25em" }}>
              {first_aid_about.Price}$
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
    </>
  );
};

export default AboutFirst_aid;
