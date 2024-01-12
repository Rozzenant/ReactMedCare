import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import NavigationBar from "../Navbar/Navbar";
import { addToCart, removeFromCart } from '../../store/CartSlice';
import { setTraumas } from '../../store/TraumaSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const trauma = useSelector((state: RootState) => state.cart.trauma);
  // const userTrauma = useSelector((state: RootState) => state.traumas.traumas);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<TraumaInt | null>(trauma);
  const navigate = useNavigate();
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = { ...formData };
    updatedFormData.Trauma_Name = e.target.value;

    setFormData(updatedFormData);
  };
  const deleteTrauma = async (trauma_ID: number) => {
    try {
      const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
      if (jwtTokenCookie) {
        const token = jwtTokenCookie.split('=')[1];
        const response = await axios.delete(
          `http://127.0.0.1:8000/trauma/${trauma_ID}/delete`,
          {
            withCredentials: true,
            headers: {
              'Authorization': `b'${token}'`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          const responseTrauma = await axios.get(
            'http://127.0.0.1:8000/trauma/',
            {
              withCredentials: true,
              headers: {
                'Authorization': `b'${token}'`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (responseTrauma.status === 200) {
            const traumaData: TraumaInt[] = Array.isArray(responseTrauma.data) ? responseTrauma.data : [];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(setTraumas(traumaData));
            dispatch(removeFromCart());
            navigate('/');
          }
        } else {
          throw new Error('Ошибка при удалении поражения');
        }
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };
  const handleDeleteTrauma = () => {
    if (trauma?.Trauma_ID) {
      deleteTrauma(trauma.Trauma_ID);
    }
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let traumaIN;
    try {
      if (formData && trauma !== null) {
        const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));

        if (jwtTokenCookie) {
          const token = jwtTokenCookie.split('=')[1];
          const trauma_ID = trauma.Trauma_ID;
          const responseChange = await axios.put(
              `http://127.0.0.1:8000/trauma/${trauma_ID}/`,
              formData,
              {
                withCredentials: true,
                headers: {
                  'Authorization': `b'${token}'`,
                  'Content-Type': 'application/json',
                },
              }
          );

          if (responseChange.status === 200) {
            const responseTrauma = await axios.get(
                'http://127.0.0.1:8000/trauma/',
                {
                  withCredentials: true,
                  headers: {
                    'Authorization': `b'${token}'`,
                    'Content-Type': 'application/json',
                  },
                }
            );

            if (responseTrauma.status === 200) {
              const traumasData: TraumaInt[] = Array.isArray(responseTrauma.data) ? responseTrauma.data : [];

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

              dispatch(setTraumas(traumasData));
              if (traumaIN) {
                console.log('cart:', traumaIN);
                dispatch(addToCart(traumaIN));
              }
            }
          } else {
            throw new Error('Ошибка при отправке данных на бэкенд');
          }
        }
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };


  const handleDeleteFirst_Aid = async (trauma_ID: number, first_aid_ID: number) => {
    let traumaIN;
    try {
      const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
      if (jwtTokenCookie) {
        const token = jwtTokenCookie.split('=')[1];
        const response = await axios.delete(
            `http://127.0.0.1:8000/trauma/${trauma_ID}/delete_first_aid/${first_aid_ID}`,
            {
              withCredentials: true,
              headers: {
                'Authorization': `b'${token}'`,
                'Content-Type': 'application/json',
              },
            }
        );

        if (response.status === 204) {
          const responseTrauma = await axios.get(
              'http://127.0.0.1:8000/trauma/',
              {
                withCredentials: true,
                headers: {
                  'Authorization': `b'${token}'`,
                  'Content-Type': 'application/json',
                },
              }
          );
          if (responseTrauma.status === 200) {
            const traumasData: TraumaInt[] = Array.isArray(responseTrauma.data) ? responseTrauma.data : [];

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

            // if (traumaIN !== null) {
            //   const responseChange = await axios.delete(
            //       `http://127.0.0.1:8000/trauma/${traumaIN}/delete`,
            //       {
            //         withCredentials: true,
            //         headers: {
            //           'Authorization': `b'${token}'`,
            //           'Content-Type': 'application/json',
            //         },
            //       }
            //   );
            //
            //   if (responseChange.status === 200) { /* empty */ }
            // }

            dispatch(setTraumas(traumasData));
            if (traumaIN !== null) {
              const responseChange = await axios.get(
                  `http://127.0.0.1:8000/trauma/${traumaIN}`,
                  {
                    withCredentials: true,
                    headers: {
                      'Authorization': `b'${token}'`,
                      'Content-Type': 'application/json',
                    },
                  }
              );

              if (responseChange.status == 200){
                traumaIN = responseChange.data;
              }
              console.log(traumaIN);
              dispatch(addToCart(traumaIN));
              const updatedFormData = {...formData};
              updatedFormData.First_aid_in_Trauma_List = updatedFormData.First_aid_in_Trauma_List?.filter(
                  (first_aid) => first_aid.First_aid_ID !== first_aid_ID
              );

              setFormData(updatedFormData);

            }
          }

        } else {
          throw new Error('Ошибка при удалении первой помощи из поражения');
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при удалении первой помощи:', error);
    }
  };
  const handleFormTrauma = async () => {
    try {
      const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
      if (jwtTokenCookie) {
        const token = jwtTokenCookie.split('=')[1];
        const responseFirstAid = await axios.get(
        'http://127.0.0.1:8000/first_aid/',
        {
          withCredentials: true,
          headers: {
            'Authorization': `b'${token}'`,
            'Content-Type': 'application/json',
          },
        }
      );
        
        if (responseFirstAid.status === 200) {
          const firstAidData = responseFirstAid.data;
          if (firstAidData && firstAidData['trauma_draft'] !== null){
            const id: number = firstAidData['trauma_draft'];
            const response = await axios.get(
          `http://127.0.0.1:8000/trauma/${id}/status_to_formed/`,
          {
            withCredentials: true,
            headers: {
              'Authorization': `b'${token}'`,
              'Content-Type': 'application/json',
            },
          }
        );


            if (response.status === 200) {
          const responseTrauma = await axios.get(
            'http://127.0.0.1:8000/trauma/',
            {
              withCredentials: true,
              headers: {
                'Authorization': `b'${token}'`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (responseTrauma.status===200){
            const traumasData: TraumaInt[] = Array.isArray(responseTrauma.data) ? responseTrauma.data : [];
            const TraumaIN = traumasData.find(trauma => trauma.Status === 'Draft');
            dispatch(setTraumas(traumasData));

            console.log('cart:',TraumaIN);
            dispatch(removeFromCart());
            console.log('cart2:',TraumaIN);
            navigate('/');

          }
        }

          }
          console.log('Данные успешно получены');
        } else {
          throw new Error('Ошибка при формировании поражения');
        }
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
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
                    onChange={handleNameChange}
                  />
                </Form.Group>
                <Form.Group controlId="formObjects" className="mb-2  text-center">
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
                              handleDeleteFirst_Aid(trauma?.Trauma_ID || 0, first_aid.First_aid_ID);
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
            <Button className={"button-style button-style-more"} type="submit" onClick={handleFormSubmit}>
              Изменить поражение
            </Button>
            <Button className={"button-style button-style-more"} onClick={handleFormTrauma}>
              Сформировать поражение
            </Button>
            <Button className={"button-style button-style-more"} onClick={handleDeleteTrauma}>
              Удалить
            </Button>
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default Traumas;