import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import First_aid_List from '../components/First_aid_List.tsx';
import First_aid_About from '../components/First_aid_About/First_aid_About.tsx'
import Auth from '../components/auth/auth.tsx'
import Register from '../components/auth/register'
import TraumaHistory from "../components/Traumas/trauma_history.tsx";
import SingleTrauma from "../components/Traumas/singleTrauma.tsx";
import Traumas from "../components/Traumas/traumas.tsx";
// import Traumas from '../components/Traumas/traumas.tsx'


function App() {

  return (
      <BrowserRouter basename="/ReactMedCare">
        <Routes>
            <Route path="" element={<First_aid_List />} />
            <Route path=":id" element={<First_aid_About />} />
            <Route path="/auth/" element={<Auth />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/trauma_history/" element={<TraumaHistory />} />
            <Route path="/trauma/:id" element={<SingleTrauma />} />
            <Route path="/trauma/" element={<Traumas/> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App
