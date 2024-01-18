import { Container, Card, ListGroup } from "react-bootstrap";
import NavigationBar from "../Navbar/Navbar";
import {useLocation, useParams} from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.tsx";
import React, {useEffect, useState} from "react";
import { First_aid_Inter } from "../../Models/First_aid.tsx";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";


const AboutFirst_aid: React.FC = () => {
  const location = useLocation();
  const { id } = useParams();
  const [first_aid_about, setFirstAidAbout] = useState<First_aid_Inter | null>(null);
  const user = useSelector((state: RootState) => state.user);
useEffect(() => {
  if (location.state === null) {
    axios.get(
        `http://127.0.0.1:8000/first_aid/${id}/`,
        {
            withCredentials: true,
            headers: {
              'Authorization': `${user.jwt}`,
              'Content-Type': 'application/json',
            },
          }
    )
      .then(response => {
        setFirstAidAbout(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    setFirstAidAbout(location.state.first_aid);
  }
}, [id, location.state]);
  if (!first_aid_about) {
    return <div>Загружаем...</div>;
  }
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
                {first_aid_about.Price === 0 ? (
                    <ListGroup.Item style={{ textAlign: "center", fontSize: "1.25em" }}>
                        Бесплатно
                   </ListGroup.Item>
                ):(
                    <ListGroup.Item style={{ textAlign: "center", fontSize: "1.25em" }}>
                        {first_aid_about.Price} $
                   </ListGroup.Item>
                )}

          </ListGroup>
        </Card>
      </Container>
    </>
  );
};

export default AboutFirst_aid;
