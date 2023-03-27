import Navbar from './components/Navbar';
import TodoForm from './components/TodoForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
   
   
  return (
    <>
    <Router>
    <Navbar />
      <Routes>
      <Route path='/'   element={ <TodoForm/>} />
      <Route path='/auth/register' element={ <SignUp />} />
      <Route path='/auth/login' element={ <Login />} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
