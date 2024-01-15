import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';
import NavigationBar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";


const First_aids_table: React.FC = () => {
  const [first_aids, setFirstAids] = useState<FirstAidInt[]>([]);
  // const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

      interface FirstAidInt {
      First_aid_ID: number;
      First_aid_Name: string;
      Status: string;
      Description?: string;
      Image_URL: string;
      Price: number;
    }

  const handleDeleteFirstAid = async (id: number) => {
    try {

        const response = await axios.delete(
          `http://127.0.0.1:8000/first_aid/delete/${id}`,
          {
            withCredentials: true,
            headers: {
              'Authorization': `${user.jwt}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          // Если удаление прошло успешно, обновляем данные
          fetchData();
        }
        fetchData();
    } catch (error) {
      console.error('Error deleting first_aid:', error);
    }
  };

  const handleDelete = (id: number) => {
    handleDeleteFirstAid(id);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
          `http://127.0.0.1:8000/first_aid/`,
          {
            withCredentials: true,
            headers: {
              'Authorization': `${user.jwt}`,
              'Content-Type': 'application/json',
            },
          }
        );
      if (response.status === 200) {
          console.log(response.data['first_aids'])
        setFirstAids(response.data['first_aids']);
      } else {
        throw new Error('Failed to get data from the server');
      }
    } catch (error) {
      console.error(error);
      setFirstAids([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleRowClick = (id: number) => {
    navigate(`/first_aids/${id}`);
  };

  const handleCreateFirstAid = () => {
    // setIsCreating(true);
    navigate('/first_aids/0');
  };

const statusMap: { [key: string]: string } = {
  '0': 'Удален',
  '1': 'Действует',
};

  return (
    <>
      <NavigationBar />
      <div className="">
        <Container fluid style={{ minHeight: '100vh' }} className="text-center">
          <h1>Список первых помощей</h1>
          <Button className="button-style" style={{ marginBottom: '20px' }} onClick={handleCreateFirstAid}>
            Создать Первую помощь
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Описание</th>
                <th>Цена</th>
                <th>Статус</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {first_aids.map((first_aid) => (
                <tr key={first_aid.First_aid_ID}>
                <td onClick={() => handleRowClick(first_aid.First_aid_ID)} style={{ cursor: 'pointer' }}>
                {first_aid.First_aid_Name}</td>

                <td onClick={() => handleRowClick(first_aid.First_aid_ID)} style={{ cursor: 'pointer' }}>
                {first_aid.Description}</td>
                <td onClick={() => handleRowClick(first_aid.First_aid_ID)} style={{ cursor: 'pointer' }}>
                {first_aid.Price}</td>
                <td onClick={() => handleRowClick(first_aid.First_aid_ID)} style={{ cursor: 'pointer' }}>
                {statusMap[first_aid.Status]}</td>
                <td>
                <Button disabled={first_aid.Status == "0"} className="button-style" onClick={() => handleDelete(first_aid.First_aid_ID)}>
                  Удалить
                </Button>
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
};

export default First_aids_table;