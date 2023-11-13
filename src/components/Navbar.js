import React, { useEffect } from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";

function Navbar() {
  let location = useLocation();
  useEffect(() => {
   console.log(location.pathname);
  }, [location]);
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Tizon Notes App</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/'? 'active':''}`}  aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about'? 'active':''}`} to="/about">About</Link>
                </li>
            </ul>
            {localStorage.getItem('token')? <Link onClick={handleLogout} className='btn bg-primary mx-2' aria-current="page" to="/login">Logout</Link> :<form>
              <Link className='btn bg-primary mx-2' aria-current="page" to="/login">Login</Link>
             <Link className='btn bg-primary mx-2' aria-current="page" to="/signup">Signup</Link>
            </form>  }
          
    </div>
        </div>
        </nav>
    </>
  )
}

export default Navbar