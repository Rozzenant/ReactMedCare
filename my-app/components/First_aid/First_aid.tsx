import React from "react";
import { First_aid_Inter } from "../../Models/First_aid.tsx";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, useLocation } from "react-router-dom";
import defaultImg from "../../src/assets/defaultImg.png";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import axios from "axios";
import {setTraumas} from "../../store/TraumaSlice.ts";
import {addToCart} from "../../store/CartSlice.ts";
// import traumas from "../Traumas/traumas.tsx";

interface First_aid_Props {
  first_aid: First_aid_Inter;
}

const First_aid: React.FC<First_aid_Props> = ({ first_aid }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const addToTrauma = async () => {
    let traumasData;
    let traumaIN;
    try {
      const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));

      if (jwtTokenCookie) {
        const token = jwtTokenCookie.split('=')[1];

        // const traumasData: TraumaInt[] = Array.isArray(responseFirst_aid.data) ? responseFirst_aid.data : [];
        // const traumaIN = traumasData.find(trauma => trauma.Status === 'Draft');

        const responseFirst_aid_to_Trauma = await axios.put(
            `http://127.0.0.1:8000/first_aid/add_to_trauma/${first_aid.First_aid_ID}`,
            null,
            {
              withCredentials: true,
              headers: {
                'Authorization': `b'${token}'`,
                'Content-Type': 'application/json',
              },
            }
        );

        if (responseFirst_aid_to_Trauma.status === 200) {
          traumasData = responseFirst_aid_to_Trauma.data;
        }

        const responseFirst_aid = await axios.get(
            'http://127.0.0.1:8000/first_aid/',
            {
              withCredentials: true,
              headers: {
                'Authorization': `b'${token}'`,
                'Content-Type': 'application/json',
              },
            }
        );
        if (responseFirst_aid.status == 200) {
          traumaIN = responseFirst_aid.data['trauma_draft'];
        } else {
          traumaIN = null;
        }

        if (traumaIN !== null) {


          const responseTrauma = await axios.get(
              `http://127.0.0.1:8000/trauma/${traumaIN}`,
              {
                withCredentials: true,
                headers: {
                  'Authorization': `b'${token}'`,
                  'Content-Type': 'application/json',
                },
              }
          );


          if (responseTrauma.status === 200) {
            traumasData = responseTrauma.data;
            dispatch(setTraumas(traumasData));
            dispatch(addToCart(traumasData));
          }

        }

        // if (traumaIN) {
        //   dispatch(addToCart(traumaIN));
        // }

      } else {
        console.error('Токен JWT отсутствует в куки.');
      }

    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }

  };

  const ButtonClick = () => {
    navigate(`/${first_aid.First_aid_ID}`, {
      state: {object: first_aid, returnTo: location.pathname},
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
            style={{width: "267px", height: "200px", objectFit: "cover"}}
            variant="top"
            src={first_aid.Image_URL || defaultImg}
        />
        <Card.Body>
          <Card.Title style={{height: "3rem"}}>
            {first_aid.First_aid_Name}
          </Card.Title>
          <Card.Text>{first_aid.Price} $</Card.Text>
          {user.id != -1 && (
              <Button className="button-style button-style-more" onClick={addToTrauma}>
                Добавить в поражение
              </Button>
          )}
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

