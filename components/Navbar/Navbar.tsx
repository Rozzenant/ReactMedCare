import { Container, Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar style={{border: "2px solid lightblue"}} bg="light" variant="light">
            <Container>
                <Navbar.Brand style={{ marginLeft: '50px' }} href="/ReactMedCare">Медицинские услуги</Navbar.Brand>
                <Nav>
                    <Nav.Link href="/ReactMedCare">Главная</Nav.Link>
                    <Nav.Link href="">О нас</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

    );
};

export default NavigationBar;