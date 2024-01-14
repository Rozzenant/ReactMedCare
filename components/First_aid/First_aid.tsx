import React from "react";
import { First_aid_Inter } from "../../Models/First_aid.tsx";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, useLocation } from "react-router-dom";
import defaultImg from "../../src/assets/defaultImg.png";

interface First_aid_Props {
  first_aid: First_aid_Inter;
}

const First_aid: React.FC<First_aid_Props> = ({ first_aid }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const ButtonClick = () => {
    navigate(`/${first_aid.First_aid_ID}`, {
      state: { first_aid: first_aid, returnTo: location.pathname },
    });
  };

  return (
    <Card
      style={{
        width: "267px",
        height: "100%",
        marginTop: "5px",
        marginLeft: "75px",
      }}
    >
      <Card.Img
        style={{ width: "267px", height: "200px", objectFit: "cover" }}
        variant="top"
        src={first_aid.Image_URL || defaultImg}
      />
      <Card.Body>
        <Card.Title style={{ height: "3rem" }}>
          {first_aid.First_aid_Name}
        </Card.Title>
        <Card.Text>{first_aid.Price} $</Card.Text>
        <Button
          className="button-style button-style-more"
          onClick={ButtonClick}
        >
          Подробнее
        </Button>
      </Card.Body>
    </Card>
  );
};

export default First_aid;
