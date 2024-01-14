import React, { useEffect, useState } from "react";
import First_aid from "./First_aid/First_aid.tsx";
import { First_aid_Inter } from "../Models/First_aid.tsx";
import { Container, Row, Col } from "react-bootstrap";
import NavigationBar from "../components/Navbar/Navbar";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import First_aid_Filter from "../components/Filter/Filter";
import { mockObjects } from "../src/assets/mockObject";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {setFilter} from '../store/Filter_first_aid_Slice.ts'
import {RootState} from "../store/store.ts";


const First_aid_List: React.FC = () => {
  const [first_aid, setFirst_aids] = useState<First_aid_Inter[]>([]);
  const [filtredFirst_aid, setFiltred_First_aid] = useState<First_aid_Inter[]>(
    []
  );
  const filter_fa = useSelector((state: RootState) => state.filterFirst_Aid)
  const dispatch = useDispatch();



  const FilterChange = (filteredFirst_aid: First_aid_Inter[]) => {
    dispatch(setFilter(filteredFirst_aid));
    setFiltred_First_aid(filteredFirst_aid);
  };


  useEffect(() => {
      if (filter_fa.filter_fa === null || filter_fa.filter_fa?.length === 0) {
          axios.get("http://127.0.0.1:8000/first_aid/")
              .then((response) => {
                  const data = response.data;
                  setFirst_aids(data["first_aids"]);
                  setFiltred_First_aid(data["first_aids"]);
                  // if (filter_fa.filter_fa === null || filter_fa.filter_fa?.length === 0) {
                  //     dispatch(setFilter(data['first_aids']))
                  // } else {
                  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //     // @ts-expect-error
                  //     setFiltred_First_aid(filter_fa.filter_fa)
                  // }
              })
              .catch((error) => {
                  console.error(error);
                  setFirst_aids(mockObjects);
              });
      }
      else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          setFiltred_First_aid(filter_fa.filter_fa)
      }
}, []);



  return (
    <>
      <NavigationBar />
      <Breadcrumbs />
      <First_aid_Filter first_aids={first_aid} onFilterChange={FilterChange} />
      <Container fluid>
        <Row style={{ display: "flex", gap: "20px" }}>
          {filtredFirst_aid.map((first_aid) => (
            <Col sm={2} key={first_aid.First_aid_ID}>
              <First_aid first_aid={first_aid} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default First_aid_List;
