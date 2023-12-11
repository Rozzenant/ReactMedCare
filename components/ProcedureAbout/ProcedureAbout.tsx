import React from 'react';
import { Container,  Card, ListGroup } from "react-bootstrap";
import NavigationBar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs.tsx';

const AboutObject: React.FC = () => {
    const location = useLocation();
    const procedureAbout = location.state.object
    return (
        <>
            <NavigationBar />
            <Breadcrumbs />
            <Container fluid style={{ height: '100%'}} className="bg-secondary d-flex align-items-center justify-content-center" >
                <Card style={{ width: '50%',}}>
                    <Card.Img variant="top" src={procedureAbout.Image_URL} />
                    <Card.Body>
                        <Card.Title>{procedureAbout.Procedure_Name}</Card.Title>
                        <Card.Text>
                            {procedureAbout.Description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{procedureAbout.Price}$</ListGroup.Item>
                    </ListGroup>

                </Card>


            </Container>
        </>

    )
}

export default AboutObject