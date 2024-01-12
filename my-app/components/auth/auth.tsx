import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {login} from '../../store/UserSlice';
import {Link, useNavigate} from 'react-router-dom';
import {setTraumas} from '../../store/TraumaSlice';
import {addToCart} from '../../store/CartSlice';


/* eslint-disable  @typescript-eslint/no-explicit-any */
const AxiosTraumas = async (token:any) => {
  try {

    const response = await axios.get(
      'http://127.0.0.1:8000/trauma/',
      {
        withCredentials: true,
        headers: {
          'Authorization': `b'${token}'`,
          'Content-Type': 'application/json',
        },
      }
    );
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
      // console.log('Отправка данных на сервер:', { username, password });
      console.log('Ответ сервера:', response.data);
      if (JSON.stringify(response.data).includes('Успешная авторизация')) {
        const datauser = {
          Is_Super: response.data.user.Is_Super,
          id: response.data.user.id,
          username: username,
          password: password
        };
        dispatch(login(datauser));

        document.cookie = `jwt=${response.data['jwt']}; path=/`;
        const token = response.data['jwt']

        const traumasData = await AxiosTraumas(response.data['jwt']);

        const responseFirst_Aid = await axios.get(
            `http://127.0.0.1:8000/first_aid/`,
            {
              withCredentials: true,
              headers: {
                'Authorization': `b'${token}'`,
                'Content-Type': 'application/json',
              },
            }
        );


        const traumaDraft = responseFirst_Aid.data['trauma_draft'];
        dispatch(setTraumas(traumasData));
        if (traumaDraft) {
          dispatch(addToCart(traumaDraft));
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
          <h2 className="mb-2 text-center">Авторизация</h2>
          <Form>
            <Form.Group controlId="formUsername" className="d-flex flex-row">
              <Form.Label style={{ marginRight: '30px', color: '#6fbce3', fontWeight: 'bold' }}>Логин</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="d-flex flex-row">
              <Form.Label style={{ marginRight: '20px', color: '#6fbce3', fontWeight: 'bold' }}>Пароль</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </Form.Group>
            <div className="d-flex justify-content-center gap-5">
              <Button variant="primary" onClick={handleLogin} style={{ marginRight: '15px', marginTop: '20px',
                color: 'white', backgroundColor: '#6fbce3', borderColor: 'lightgrey' }}>
                Войти
              </Button>
              <Link to="/register">
                <Button variant="secondary" style={{marginTop: '20px'}}>
                  Регистрация
                </Button>
              </Link>
            </div>
            {message && (
              <div className="text-center mt-3">
                <p className={message.includes('Ошибка') ? 'text-danger' : 'text-success'}>{JSON.parse(message).message}</p>
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;