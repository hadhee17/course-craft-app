// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex justify-between items-center py-4 w-full">
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-yellow-300 transition-colors"
          >
            CourseHub
          </Link>

          <div className="flex items-center space-x-4 ml-auto">
            {currentUser ? (
              <>
                <span className="text-white font-medium">
                  Hello, {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-700 bg-white rounded-lg shadow hover:bg-gray-100 font-semibold transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg shadow font-semibold transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
