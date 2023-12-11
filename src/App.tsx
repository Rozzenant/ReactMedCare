import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProcedureList from '../components/ProcedureList.tsx';
import ProcedureAbout from '../components/ProcedureAbout/ProcedureAbout.tsx'

function App() {

  return (
      <BrowserRouter basename="/main-page">
        <Routes>
          <Route path="" element={<ProcedureList />} />
          <Route path="/about/" element={<ProcedureAbout />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
