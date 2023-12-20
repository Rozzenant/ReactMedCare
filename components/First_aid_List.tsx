import React from "react";
import { useEffect, useState } from "react";
import First_aid from "./First_aid/First_aid.tsx";
import { First_aid_Inter } from "../Models/First_aid.tsx";
import { Container,  Row, Col  } from "react-bootstrap";
import NavigationBar from "../components/Navbar/Navbar";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import First_aid_Filter from "../components/Filter/Filter";
import {mockObjects} from "../src/assets/mockObject"


const First_aid_List: React.FC = () => {
  const [first_aid, setFirst_aids] = useState<First_aid_Inter[]>([]);
  const [filtredFirst_aid, setFiltred_First_aid] = useState<First_aid_Inter[]>([]);
  const FilterChange = (filteredFirst_aid: First_aid_Inter[]) => {
    setFiltred_First_aid(filteredFirst_aid);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/first_aid")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed get Data");
        }
      })
      .then((data) => {
        setFirst_aids(data['first_aids']);
      })
      .catch((error) => {
        console.log(error);
        setFirst_aids(mockObjects);
      });
  }, []);
  return (
    <>
      <NavigationBar />
      <Breadcrumbs />
      <First_aid_Filter first_aids={first_aid} onFilterChange={FilterChange} />
      <Container fluid>
        <Row style={{ display: "flex", gap: "20px"}}>
          {filtredFirst_aid.map((first_aid) => (
            <Col sm={2}>
              <First_aid first_aid={first_aid} key={first_aid.First_aid_ID} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default First_aid_List;