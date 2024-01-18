import { Container, Navbar, Nav } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import {logout, set_trauma_draft_id} from '../../store/UserSlice';
import {Link, useNavigate} from 'react-router-dom';
import Cart from "../Cart/cart.tsx";
import Cookies from "js-cookie";
// import React from "react";


const NavigationBar = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            if (user.trauma_draft) {
                await axios.delete(
                    `http://127.0.0.1:8000/trauma/${user.trauma_draft_id}/delete`,
                    {
                        withCredentials: true,
                        headers: {
                            'Authorization': `${user.jwt}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );
            }

            await axios.post(
              `http://127.0.0.1:8000/auth/logout/`,
              {},
                {
                    withCredentials: true,
                    headers: {
                      'Authorization': `${user.jwt}`,
                      'Content-Type': 'application/json',
                    },
                }
            );

            Cookies.remove('jwt');
            dispatch(logout());
            dispatch(set_trauma_draft_id({"trauma_draft_id": null}))
            navigate('/');
        }
        catch (error) {
          console.error('Ошибка выхода:', error);
        }
      };

    return (
        <Navbar style={{border: "2px solid lightblue", }}>
            <Container>
                <Navbar.Brand style={{ marginLeft: '50px' }} as={Link} to="/">Медицинские услуги</Navbar.Brand>
                <Nav>
                    {user.id != -1? (
                        user.trauma_draft ? (
                            <Nav.Link as={Link} to={`/trauma/${user.trauma_draft_id}`} style={{padding: '0'}}>
                            <Cart/>
                            </Nav.Link>
                        ) : (
                            <Cart/>
                        )

                          ):(
                              <></>
                          )}
                      {user.Is_Super === false && user.id === -1 && (
                        <>
                          <Nav.Link as={Link} to="/auth/">Войти</Nav.Link>
                        </>
                      )}
                      {user.Is_Super === false && user.id !=-1 && (
                        <>
                            <Nav.Link as={Link} to="/trauma_history/">Мои поражения</Nav.Link>
                            <Nav.Link as={Link} to="/">Главная</Nav.Link>
                            <Nav.Link style={{cursor: 'default'}}>{user.username}</Nav.Link>
                            <Nav.Link onClick={handleLogout}>Выйти</Nav.Link>
                        </>
                      )}
                      {user.Is_Super === true && (
                        <>
                            <Nav.Link as={Link} to="/first_aids/">Таблица первых помощей</Nav.Link>
                            <Nav.Link as={Link} to="/trauma_history/">Все Поражения</Nav.Link>
                            <Nav.Link as={Link} to="/">Главная</Nav.Link>
                            <Nav.Link style={{cursor: 'default'}}>{user.username}</Nav.Link>
                            <Nav.Link onClick={handleLogout}>Выйти</Nav.Link>
                        </>
                      )}
                </Nav>
            </Container>
        </Navbar>

    );
};

export default NavigationBar;