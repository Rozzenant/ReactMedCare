import React from "react";
import { First_aid_Inter } from "../../Models/First_aid.tsx";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, useLocation } from "react-router-dom";
import defaultImg from "../../src/assets/defaultImg.png";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store/store.ts";
import axios from "axios";
import {change_status_trauma_draft, set_trauma_draft_id} from "../../store/UserSlice.ts";

interface First_aid_Props {
  first_aid: First_aid_Inter;
}

const First_aid: React.FC<First_aid_Props> = ({ first_aid }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const addToTrauma = async () => {
    try {
      const token = user.jwt;
      const put_response = await axios.put(
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
      if ((put_response.status === 200) && !(user.trauma_draft)) {
        dispatch(change_status_trauma_draft());
        const response_trauma_draft = await axios.get("http://127.0.0.1:8000/first_aid/",
            {
                withCredentials: true,
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                }
            });

        if (response_trauma_draft.status === 200){
            dispatch(set_trauma_draft_id({'trauma_draft_id': response_trauma_draft.data['trauma_draft']}))
            // console.log(user.trauma_draft_id)
        }

      }


    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }

  };

  const ButtonClick = () => {
    navigate(`/${first_aid.First_aid_ID}`, {
      state: {first_aid: first_aid, returnTo: location.pathname},
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

