import React from "react";
import { useEffect, useState } from "react";
import Procedure from "./Procedure/Procedure.tsx";
import { ProcedureInter } from "../Models/procedure.tsx";
import { Container,  Row, Col  } from "react-bootstrap";
import NavigationBar from "../components/Navbar/Navbar";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ProcedureFilter from "../components/Filter/Filter";
import {mockObjects} from "../src/assets/mockObject"


const ProceduresList: React.FC = () => {
  const [Procedures, setProcedure] = useState<ProcedureInter[]>([]);
  const [filtredProcedures, setFiltredProcedures] = useState<ProcedureInter[]>([]);
  const FilterChange = (filteredProcedures: ProcedureInter[]) => {
    setFiltredProcedures(filteredProcedures);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/medical-procedures/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed get Data");
        }
      })
      .then((data) => {
        setProcedure(data);
      })
      .catch((error) => {
        console.log(error);
        setProcedure(mockObjects);
      });
  }, []);
  return (
    <>
      <NavigationBar />
      <Breadcrumbs />
      <ProcedureFilter procedures={Procedures} onFilterChange={FilterChange} />
      <Container fluid>
        <Row style={{ display: "flex", gap: "20px"}}>
          {filtredProcedures.map((procedure) => (
            <Col sm={2}>
              <Procedure procedure={procedure} key={procedure.Procedure_ID} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProceduresList;