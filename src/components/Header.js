import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button.tsx';

export default function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="text-2xl font-bold text-primary">
              SaaS LMS
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="ml-8">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" className="ml-8">
                    Đăng ký
                  </Button>
                </Link>
              </>
            ) : (
              <Button variant="ghost" className="ml-8" onClick={onLogout}>
                Đăng xuất
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
