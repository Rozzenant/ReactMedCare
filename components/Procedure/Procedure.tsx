import React from 'react';
import { ProcedureInter } from '../../Models/procedure.tsx';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import defaultImg from '../../src/assets/defaultImg.png'

interface ProcedureProps {
    procedure: ProcedureInter
}
  const Procedure: React.FC<ProcedureProps> = ({procedure}) => {
    const navigate = useNavigate();
    const ButtonClick = () => {
      navigate("about/", {state: { object: procedure}});
    };
    return (
      <Card style={{ width: '267px', height: '100%', marginTop:'5px', marginLeft: "75px"}}>
        <Card.Img style={{ width: '267px',height:'200px', objectFit: "cover" }} variant="top" src={procedure.Image_URL || defaultImg} />
        <Card.Body>
          <Card.Title style={{height: "3rem"}}>{procedure.Procedure_Name}</Card.Title>
          <Card.Text>
            {procedure.Price} $
          </Card.Text>
          <Button style={{width: "100%"}} variant="secondary"  onClick={ButtonClick}>Подробнее</Button>
        </Card.Body>
      </Card>
    );
  };

export default Procedure;