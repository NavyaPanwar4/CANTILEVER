import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout({ darkMode, toggleTheme }) {
  return (
    <>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
