import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, X, Bell, User as UserIcon } from 'lucide-react';
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-green-600">Community Pulse</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`text-sm font-medium ${isActive('/') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
              Home
            </Link>
            {user && (
              <>
                <Link to="/my-events" className={`text-sm font-medium ${isActive('/my-events') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
                  My Events
                </Link>
                <Link to="/registered-events" className={`text-sm font-medium ${isActive('/registered-events') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
                  Registered Events
                </Link>
              </>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className={`text-sm font-medium ${isActive('/admin') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
                Admin
              </Link>
            )}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/notifications" className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Notifications">
                  <Bell size={20} />
                </Link>
                <div className="relative group">
                  <Link to="/profile" className="flex items-center text-sm font-medium text-gray-700 hover:text-green-600">
                    <UserIcon size={20} className="mr-1" />
                    <span>{user.username}</span>
                  </Link>
                  <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link to="/create-event" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Create Event</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Search Bar (conditionally rendered) */}
        {isSearchOpen && (
          <div className="py-3 border-t">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for events..."
                className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  onClick={toggleSearch}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Menu (conditionally rendered) */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/my-events"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/my-events') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  My Events
                </Link>
                <Link
                  to="/registered-events"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/registered-events') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  Registered Events
                </Link>
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/profile') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <Link
                  to="/notifications"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/notifications') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  Notifications
                </Link>
                <Link
                  to="/create-event"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/create-event') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  Create Event
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/admin') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={closeMenu}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-4 pb-2 border-t border-gray-200">
                <div className="flex items-center px-3">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" fullWidth>Login</Button>
                  </Link>
                </div>
                <div className="mt-3 px-3">
                  <Link to="/register" className="w-full">
                    <Button fullWidth>Sign Up</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;