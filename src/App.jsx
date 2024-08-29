import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import LogoutButton from './components/LogoutButton.jsx';
import axios from 'axios';

export default function App() {
  const navigate = useNavigate()

  const onLogout = async (e) => {
    e.preventDefault()
    await axios.post('/api/logout')
      .then((res) => {
        if (res.data.success) {
          navigate('/')
        }
      })
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">All movies</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
          <li>
            <NavLink to="/me">Your ratings</NavLink>
          </li>
          <li>
            <LogoutButton onLogout={onLogout}/>
          </li>
        </ul>
      </nav>

      <hr />

      <main>
        <Outlet />
      </main>
    </>
  );
}
