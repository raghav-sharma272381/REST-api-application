
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main'
import Edit from './pages/Edit'

function App() {

  return (
    <>
    <Router>
      <Routes>
         <Route path='/' element={<Main />} />
         <Route path="/edit/:id" element={<Edit />} />

      </Routes>

    </Router>
      
    </>
  )
}

export default App
