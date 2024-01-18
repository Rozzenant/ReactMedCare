import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import First_aid_List from '../components/First_aid_List.tsx';
import First_aid_About from '../components/First_aid_About/First_aid_About.tsx'
import Auth from '../components/auth/auth.tsx'
import Register from '../components/auth/register'
import TraumaHistory from "../components/Traumas/trauma_history.tsx";
import SingleTrauma from "../components/Traumas/singleTrauma.tsx";
import Traumas from "../components/Traumas/traumas.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import First_aids_table from "../components/First_aid/First_aid_list_mod.tsx";
import First_Aid_Mod from "../components/First_aid_About/First_Aid_About_Mod.tsx";
import Cookies from "js-cookie"
import {useEffect, useState} from "react";
import {login, set_jwt} from "../store/UserSlice.ts";
import axios from "axios";
// import Traumas from '../components/Traumas/traumas.tsx'


function App() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('jwt');
                if (token && (token !== "undefined")) {
                    console.log(token);
                    await fetchAuthorization();
                    dispatch(set_jwt({"jwt": token}));
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Ошибка входа:', error);
            }
        };

        fetchData();
    }, []);

    async function fetchAuthorization() {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/auth/',
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `${Cookies.get('jwt')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // console.log(response.data);

            if (JSON.stringify(response.data).includes('Аутентификация успешна')) {
                const datauser = {
                    Is_Super: response.data.user.Is_Super,
                    id: response.data.user.id,
                    username: response.data.user.username,
                    password: response.data.user.password,
                    trauma_draft: null,
                    jwt: response.data.access_token
                };
                // console.log(datauser);
                document.cookie = `jwt=${response.data.access_token}; path=/`;
                dispatch(login(datauser));
            }
        } catch (error) {
            console.error('Ошибка входа:', error);
        }

        // console.log(user.jwt);
    }

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-text">Загрузка...</div>
                <div className="loading-spinner"></div>
            </div>
        );
    }


    return (
        <BrowserRouter basename="/ReactMedCare">
            <Routes>
                <Route path="/auth/" element={<Auth/>}/>
                <Route path="/register/" element={<Register/>}/>
                <Route path="" element={<First_aid_List/>}/>
                <Route path=":id" element={<First_aid_About/>}/>
                <Route path="/first_aids/" element={<First_aids_table/>}/>
                <Route path="/first_aids/:id" element={<First_Aid_Mod/>}/>
                <Route path="/trauma_history/" element={<TraumaHistory/>}/>
                <Route path="/trauma/:id" element={<SingleTrauma/>}/>
                <Route path={`/trauma/${user.trauma_draft_id}`} element={<Traumas/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
