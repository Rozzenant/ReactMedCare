import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import First_aid_List from '../components/First_aid_List.tsx';
import First_aid_About from '../components/First_aid_About/First_aid_About.tsx'

function App() {

  return (
      <BrowserRouter basename="/ReactMedCare">
        <Routes>
          <Route path="" element={<First_aid_List />} />
          <Route path="/:id" element={<First_aid_About />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
