import React,{useState,useRef,useEffect} from 'react'
import Navigationbar from './Navigationbar'
import { Link } from 'react-router-dom';

function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setOpen(!open);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div>
        <div className='row1'>
        <div className='left'>
            <img src='https://img.icons8.com/?size=64&id=NzaHJt0XKIWl&format=png'></img>
            <p>The Children's Home Collective</p>
        </div>
        <Navigationbar />
        <div className='dropdown'>
        <button onClick={toggleMenu}><img src='https://img.icons8.com/?size=80&id=108652&format=png' alt='user image'/></button>
        {open && (
        <div className="dropdown-menu">
          <Link to="/">Home</Link>
          <Link to="/account">Account</Link>
        </div>
      )}
        </div>
    </div>
    </div>
  )
}

export default Header