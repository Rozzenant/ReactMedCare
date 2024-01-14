import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import NavigationBar from "../Navbar/Navbar";
// import { setTraumas } from '../../store/TraumaSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {change_status_trauma_draft, set_trauma_draft_id} from "../../store/UserSlice.ts";

interface FirstAidInt {
  First_aid_ID: number;
  First_aid_Name?: string;
  Description?: string;
  Image_URL?: string;
  Price?: number;
}

interface TraumaInt {
  Trauma_ID?: number;
  Trauma_Name?: string | null;
  Status?: string;
  Date_Creation?: string;
  Date_Approving?: string | null;
  Date_End?: string | null;
  Moderator?: number | null;
  Creator?: number | null;
  First_aid_in_Trauma_List?: FirstAidInt[];
  Confirmation_Doctor?: string;
}


const Traumas: React.FC = () => {
  // const userTrauma = useSelector((state: RootState) => state.traumas.traumas);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<TraumaInt | null>(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState('')
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = { ...formData };
    updatedFormData.Trauma_Name = e.target.value;

    setFormData(updatedFormData);
  };

  useEffect(() => {
    axios.get(
        `http://127.0.0.1:8000/trauma/${user.trauma_draft_id}`,
        {
          withCredentials: true,
          headers: {
            'Authorization': `${user.jwt}`,
            'Content-Type': 'application/json',
          },
        }
    )
      .then((response) => {
        const data = response.data;
        setFormData(data)
      })
      .catch((error) => {
        if (error.response.status == 404){
          navigate('/')
        }
        // console.error(error);
        // setDataLoaded(true);
      });
}, []);

  const handleDeleteTrauma = async () => {
    try {
      if (user.trauma_draft){
        const response = await axios.delete(
          `http://127.0.0.1:8000/trauma/${user.trauma_draft_id}/delete`,
          {
            withCredentials: true,
            headers: {
              'Authorization': `${user.jwt}`,
              'Content-Type': 'application/json',
            },
          }
        );


        if (response.status === 200 || response.status === 204) {
          setFormData(null);
          // navigate('/');
          if (user.trauma_draft) {
            dispatch(change_status_trauma_draft())
          }
        }

    }

    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (formData) {
          const trauma_ID = user.trauma_draft_id;
          await axios.put(
              `http://127.0.0.1:8000/trauma/${trauma_ID}`,
              formData,
              {
                withCredentials: true,
                headers: {
                  'Authorization': `${user.jwt}`,
                  'Content-Type': 'application/json',
                },
              }
          );

          // console.log(formData);


          } else {
            console.error("Ошибка отправки данных на бэк")
          }

    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };


  const handleDeleteFirst_Aid = async (trauma_ID: string | null, first_aid_ID: number) => {
    try {
        await axios.delete(
            `http://127.0.0.1:8000/trauma/${trauma_ID}/delete_first_aid/${first_aid_ID}`,
            {
              withCredentials: true,
              headers: {
                'Authorization': `${user.jwt}`,
                'Content-Type': 'application/json',
              },
            }
        );

        const responseTrauma = await axios.get(
          `http://127.0.0.1:8000/trauma/${user.trauma_draft_id}`,
          {
            withCredentials: true,
            headers: {
              'Authorization': `${user.jwt}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (responseTrauma.status === 200) {
          if (responseTrauma.data.First_aid_in_Trauma_List.length === 0){
            handleDeleteTrauma();
          }
            setFormData(responseTrauma.data);
        }

    } catch (error) {
      console.error('Произошла ошибка при удалении первой помощи:', error);
    }
  };
  const handleFormTrauma = async () => {
    try {
        await axios.put(
        `http://127.0.0.1:8000/trauma/${user.trauma_draft_id}/status_to_formed/`,
            null,
        {
          withCredentials: true,
          headers: {
            'Authorization': `${user.jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );


        handleFormSubmit();
        dispatch(set_trauma_draft_id({'trauma_draft_id': null}))
        dispatch(change_status_trauma_draft())
        navigate("/");


    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setMessage(error.response.data['detail'])
      console.log('Произошла ошибка:', error);
    }
  };
  return (
    <>
      <NavigationBar />
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col md={3}>
          <Row className="justify-content-center">
            <Col>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Control
                    type="text"
                    defaultValue={formData?.Trauma_Name || ''}
                    placeholder='Введите название трамвы'
                    disabled={!user.trauma_draft}
                    onChange={handleNameChange}
                  />
                </Form.Group>
                <Form.Group controlId="formFirst_aids" className="mb-2  text-center">
                  <h4>Список первых помощей</h4>
                  <div className="d-flex flex-column">
                    {formData?.First_aid_in_Trauma_List && formData.First_aid_in_Trauma_List.map((first_aid) => (
                      <div key={first_aid.First_aid_ID} className="card mb-3">
                        <img src={first_aid.Image_URL} className="card-img-top" alt={first_aid.First_aid_Name} style={{ maxHeight: '400px', objectFit: 'cover' }} />
                        <div className="card-body  text-center">
                          <h5 className="card-title  text-center">{first_aid.First_aid_Name}</h5>
                          <h6 className="card-subtitle mb-2 text-muted  text-center">{first_aid.Price} $</h6>
                          <Button
                            size="sm"
                            onClick={() => {
                              handleDeleteFirst_Aid(user.trauma_draft_id, first_aid.First_aid_ID);
                            }}
                            className={"button-style button-style-more"}
                          >
                            Удалить
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Form.Group>
              </Form>

            </Col>
            <Button className={"button-style button-style-more"} type="submit" onClick={handleFormSubmit} disabled={!user.trauma_draft}>
              Изменить поражение
            </Button>
            <div>{message}</div>
            <Button className={"button-style button-style-more"} onClick={handleFormTrauma} disabled={!user.trauma_draft}>
              Сформировать поражение
            </Button>
            <Button className={"button-style button-style-more"} onClick={handleDeleteTrauma} disabled={!user.trauma_draft}>
              Удалить
            </Button>
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default Traumas;