import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {login} from '../../store/UserSlice';
import {Link, useNavigate} from 'react-router-dom';


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
      if (JSON.stringify(response.data).includes('Успешная авторизация')) {
        const datauser = {
          Is_Super: response.data.user.Is_Super,
          id: response.data.user.id,
          username: username,
          password: password,
          trauma_draft: null,
          jwt: response.data.Authorization
        };
        document.cookie = `jwt=${response.data.Authorization}; path=/`;
        dispatch(login(datauser));
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