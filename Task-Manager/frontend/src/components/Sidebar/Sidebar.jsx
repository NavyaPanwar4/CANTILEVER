import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar shadow-1">
      <ul className="sidebar-menu">

        <li>
          <NavLink
            to="/tasks/inbox"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <span className="material-icons">inbox</span>
            <span>Inbox</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tasks/today"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <span className="material-icons">today</span>
            <span>Today</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tasks/upcoming"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <span className="material-icons">upcoming</span>
            <span>Upcoming</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tasks/important"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <span className="material-icons">star</span>
            <span>Important</span>
          </NavLink>
        </li>

      </ul>
    </aside>
  );
}
