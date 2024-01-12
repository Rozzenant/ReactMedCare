import { Container, Navbar, Nav } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { logout } from '../../store/UserSlice';
import { removeFromCart } from '../../store/CartSlice';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    const user = useSelector((state: RootState) => state.user);
    // console.log(user)
    const dispatch = useDispatch();
    const handleLogout = async () => {
        dispatch(logout());
        dispatch(removeFromCart());
        try {
          const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
          if (jwtTokenCookie) {
            const token = jwtTokenCookie.split('=')[1];

            const response = await axios.post(
              `http://127.0.0.1:8000/auth/logout/`,
              {},

              {
                withCredentials: true,
                headers: {
                  'Authorization': `b'${token}'`,
                  'Content-Type': 'application/json',
                },
              }
            );

            console.log(response);
          }

          // await axios.post('http://127.0.0.1:8000/auth/logout/');
        }
        catch (error) {
          console.error('Ошибка выхода:', error);
        }
      };
    return (
        <Navbar bg="light" variant="light" style={{border: "2px solid lightblue", marginBottom: '5px'}}>
            <Container>
                <Navbar.Brand style={{ marginLeft: '50px' }} as={Link} to="/">Медицинские услуги</Navbar.Brand>
                <Nav className="mr-auto">
                      {user.Is_Super === false && user.id === -1 && (
                        <>
                          <Nav.Link as={Link} to="/auth/">Войти</Nav.Link>
                        </>
                      )}
                      {user.Is_Super === false && user.id !=-1 && (
                        <>
                          <Nav.Link as={Link} to="/trauma_history/">Мои поражения</Nav.Link>
                          <Nav.Link as={Link} to="/">Главная</Nav.Link>
                          <Nav.Link onClick={handleLogout}>Выйти</Nav.Link>

                        </>
                      )}
                      {user.Is_Super === true && (
                        <>
                          <Nav.Link as={Link} to="/exp_mod">Все Поражения</Nav.Link>
                          <Nav.Link as={Link} to="/">Главная</Nav.Link>
                          <Nav.Link onClick={handleLogout}>Выйти</Nav.Link>
                        </>
                      )}
                </Nav>
            </Container>
        </Navbar>

    );
};

export default NavigationBar;