import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Col, Row, Image } from 'react-bootstrap';
import NavigationBar from '../../components/Navbar/Navbar';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";


const FA_mod: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  // const [isCreating, setIsCreating] = useState<boolean>(false);
  const [first_aid_Data, setFirst_aid_Data] = useState({
    First_aid_ID: 0,
    First_aid_Name: '',
    Description: '',
    Status: '',
    Image_URL: '',
    Price: ''
  });

  useEffect(() => {
    const fetchFirstAid = async () => {
        if (id !== '0') {
            try {
                const url = `http://127.0.0.1:8000/first_aid/${id}`;
                const response = await axios.get(url, {
                    withCredentials: true,
                    headers: {
                        Authorization: `${user.jwt}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    setFirst_aid_Data(response.data);
                } else {
                    throw new Error('Failed to get data from the server');
                }
            } catch (error) {
                console.error(error);
                setFirst_aid_Data({
                    First_aid_ID: 0,
                    First_aid_Name: '',
                    Description: '',
                    Status: '',
                    Image_URL: '',
                    Price: ''
                });
            }
        }
    };

    fetchFirstAid();
  }, [id]);
  const handleCreateFirstAid = async () => {
    try {
        const randomID = Math.floor(Math.random() * 1000);
        const formData = new FormData();
        formData.append('First_aid_ID', randomID.toString());
        formData.append('First_aid_Name', first_aid_Data.First_aid_Name);
        formData.append('Description', first_aid_Data.Description);
        formData.append('Price', first_aid_Data.Price.toString());
        formData.append('Status', '1');
        if (first_aid_Data.Image_URL instanceof File) {
          formData.append('Image_URL', first_aid_Data.Image_URL);
        }

        const response = await axios.post(
          `http://127.0.0.1:8000/first_aid/create/`,
          formData,
          {
            withCredentials: true,
            headers: {
              Authorization: `${user.jwt}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          // setIsCreating(true);
          setFirst_aid_Data({
            First_aid_ID: response.data.First_aid_ID,
            First_aid_Name: '',
            Description: '',
            Price: '0',
            Status: '',
            Image_URL: '',
          });
        }
      navigate('/first_aids')
    } catch (error) {
      console.error('Error creating first aid:', error);
    }
  };
  const handleEditFirstAid = async () => {
    try {
        const fa_id = first_aid_Data.First_aid_ID;

        const formData = new FormData();
        formData.append('First_aid_ID', first_aid_Data.First_aid_ID.toString());
        formData.append('First_aid_Name', first_aid_Data.First_aid_Name);
        formData.append('Description', first_aid_Data.Description);
        formData.append('Price', first_aid_Data.Price.toString());
        formData.append('Status', first_aid_Data.Status);
        if (first_aid_Data.Image_URL instanceof File) {
          formData.append('Image_Url', first_aid_Data.Image_URL);
        }

        const responseChange = await axios.put(
          `http://127.0.0.1:8000/first_aid/${fa_id}/put/`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Authorization': `${user.jwt}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (responseChange.status === 200) {

            navigate('/first_aids');

        }
    } catch (error) {
      console.error('Error editing first aid:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
        setFirst_aid_Data((prevData) => ({ ...prevData, Image_URL: selectedFile }));
        console.log(first_aid_Data.Image_URL)
    }
  };

  const handleDelete = () => {
    setFirst_aid_Data({ ...first_aid_Data, Status: '0' });
    handleEditFirstAid();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirst_aid_Data({ ...first_aid_Data, First_aid_Name: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirst_aid_Data({ ...first_aid_Data, Description: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirst_aid_Data({ ...first_aid_Data, Price: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFirst_aid_Data({ ...first_aid_Data, Status: e.target.value });
  };

  return (
    <>
      <NavigationBar />
      <Container fluid className="align-items-center" style={{ minHeight: '100vh' }}>
        <h1 className="text-center mb-4">Детали первой помощи</h1>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            {
              first_aid_Data.Image_URL instanceof File ? (
                <Image src={URL.createObjectURL(first_aid_Data.Image_URL)} alt="первая помощь" rounded style={{ width: '400px', height: '300px' }} />
              ) : (
                first_aid_Data.Image_URL && <Image src={first_aid_Data.Image_URL} alt="первая помощь" rounded style={{ width: '400px', height: '300px' }} />
              )
            }

          </Col>
        </Row>
        <Form>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Название первой помощи</Form.Label>
                <Form.Control type="text" value={first_aid_Data.First_aid_Name} onChange={handleNameChange} />
              </Form.Group>
              <Form.Group controlId="formRegion" className="mb-3">
                <Form.Label>Описание</Form.Label>
                <Form.Control type="text" value={first_aid_Data.Description} onChange={handleDescriptionChange} />
              </Form.Group>
              <Form.Group controlId="formYear" className="mb-3">
                <Form.Label>Цена</Form.Label>
                <Form.Control type="number" value={first_aid_Data.Price} onChange={handlePriceChange} />
              </Form.Group>
              <Form.Group controlId="formStatus" className="mb-3">
                <Form.Label>Статус</Form.Label>
                <Form.Control as="select" value={first_aid_Data.Status} onChange={handleStatusChange}>
                  <option value="1">Действует</option>
                  <option value="0">Удален</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Загрузить файл</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {id === '0' ? (
              <Button  className="col-auto button-style" onClick={handleCreateFirstAid}>
                Создать
              </Button>
            ) : (
              <>
                <Button className="col-auto button-style" onClick={handleEditFirstAid}>
                  Редактировать
                </Button>
                {/* <Button variant="dark" className="col-auto" onClick={handleDelete}>
                  Удалить
                </Button> */}
              </>
            )}
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default FA_mod;