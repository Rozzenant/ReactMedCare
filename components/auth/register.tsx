import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleRegister = async () => {
    try {
      const response: AxiosResponse = await axios.post('http://127.0.0.1:8000/auth/register/', {
        username: username,
        password: password
      });

      // console.log('Успешная регистрация:', response.data);
      setMessage('Регистрация прошла успешно!');
      setUsername('');
      setPassword('');
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    catch (error: any) {
      console.error('Ошибка регистрации:', error.response?.data);
      setMessage(`Ошибка регистрации: ${JSON.stringify(error.response?.data)}`);
    }
  };



  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">Регистрация</h2>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Имя:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите ваше имя"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Пароль:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </Form.Group>
            <div className="d-flex justify-content-center ">
              <Button variant="primary" onClick={handleRegister} style={{ marginTop: '20px' }}>
                Зарегистрироваться
              </Button>
            </div>
            <div className="text-center">
              <Button variant="secondary" style={{ marginTop: '20px' }}>
                <Link to="/auth" className="text-white text-decoration-none">
                  Вернуться к авторизации
                </Link>
              </Button>
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

export default Register;