import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {

  //const todos = useSelector(state => state.todos)

  return (
    <div className='container'>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid d-flex align-items-center">
          <Link to='/' className="navbar-brand">Todo App</Link>
          <form className="d-flex">
          <Link to='/auth/register'><button type="button" className="btn btn-primary me-3">Signup</button></Link>
          <Link to='/auth/login'><button type="button" className="btn btn-primary me-4">Login</button></Link>
          
            {/* <a href="" className='text-dark' style={{ textDecoration: 'none' }}>{todos.length}</a> */}
          </form>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;