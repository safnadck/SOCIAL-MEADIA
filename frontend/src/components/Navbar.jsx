import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">SocialMedia</Link>
        <div>
          {user ? (
            <>
              <Link to="/profile" className="mr-4">Profile</Link>
              <button
                onClick={() => {
                  localStorage.removeItem('authToken');
                  window.location.reload();
                }}
                className="bg-red-500 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="mr-4">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
