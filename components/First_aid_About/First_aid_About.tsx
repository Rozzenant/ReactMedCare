import React from 'react';
import { Container,  Card, ListGroup } from "react-bootstrap";
import NavigationBar from "../Navbar/Navbar";
import {useLocation} from "react-router-dom";
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs.tsx';

const AboutFirst_aid: React.FC = () => {
    const location = useLocation();
    const first_aid_about = location.state.object
    return (
        <>
            <NavigationBar />
            <Breadcrumbs />
            <Container fluid style={{ height: '100%' }} className="d-flex align-items-center justify-content-center">
                <Card style={{ width: '30%',}}>
                    <Card.Img variant="top" className="mx-auto" src={first_aid_about.Image_URL} style={{ width: '400px',
                        height: '300px', objectFit: 'cover' }}/>
                    <Card.Body>
                        <Card.Title>{first_aid_about.First_aid_Name}</Card.Title>
                        <Card.Text>
                            {first_aid_about.Description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item style={{textAlign: 'center', fontSize: '1.25em'}}>{first_aid_about.Price}$</ListGroup.Item>
                    </ListGroup>
                </Card>
            </Container>
        </>

    )
}

export default AboutFirst_aid