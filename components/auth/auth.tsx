import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../store/UserSlice';
import { Link, useNavigate } from 'react-router-dom';
import { setTraumas } from '../../store/TraumaSlice';
import { addToCart } from '../../store/CartSlice';


interface FirstAidInt {
  FirstAid_ID: number;
  FirstAid_Name: string;
  Description: string;
  ImageURL: string;
  Price: number;
}


interface TraumaInt {
  TraumaID: number;
  Status: string;
  DateCreation: string;
  DateApproving?: string | null;
  DateEnd?: string | null;
  ModeratorId?: number | null;
  CreatorId?: number | null;
  FirstAidInTraumaList: FirstAidInt[];
  ConfirmationDoctor: string;
}

const AxiosTraumas = async (token:unknown) => {
  try {

    const response = await axios.get(
      'http://127.0.0.1:8000/trauma/',
      {
        withCredentials: true,
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log('traumas:',response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных поражений:', error);
    throw error;
  }
};
const Auth: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch= useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
        username: username,
        password: password
      });
      setMessage(`${JSON.stringify(response.data)}`);
      // console.log('Ответ сервера:', response.data);
      if (JSON.stringify(response.data).includes('Успешная авторизация')) {
        const datauser={
          Is_Super: response.data.user.Is_Super,
          id: response.data.user.id,
          username: username,
          password: password
        };
        dispatch(login(datauser));
        // console.log(response.data)
        document.cookie = `jwt=${response.data.Authorization}; path=/`;

        const traumasData: TraumaInt[] = await AxiosTraumas(response.data.Authorization);

        // console.log('TraumaData:',traumasData);
        const traumaIn = traumasData.find(trauma => trauma.Status === 'Draft');
        dispatch(setTraumas(traumasData));
        if (traumaIn) {
          // console.log('cart:',traumaIn);
          dispatch(addToCart(traumaIn));
        }

        navigate('/');
      }

    } catch (error) {
      console.error('Ошибка входа:', error);

    }
  };


  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">Авторизация</h2>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите ваш username"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </Form.Group>
            <div className="d-flex justify-content-center my-3">
              <Button variant="primary" onClick={handleLogin} style={{ marginRight: '15px' }}>
                Войти
              </Button>
              <Link to="/register">
                <Button variant="secondary">
                  Регистрация
                </Button>
              </Link>
            </div>
            {message && (
              <div className="text-center mt-3">
                <p className={message.includes('Ошибка') ? 'text-danger' : 'text-success'}>{message}</p>
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;