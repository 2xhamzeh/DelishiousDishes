import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const profileOnclick = () => {
    isAuthenticated ? navigate("/profile") : navigate("/login");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
      });

      if (response.ok) {
        logout();
        navigate("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="bg-c4 flex flex-auto justify-between items-center p-2">
      <Link to="/">
        <h1 className=" font-bold text-2xl">Delishious Dishes</h1>
      </Link>
      <nav>
        <ul className="flex gap-3 font-bold items-center">
          <li>
            <Link to="/dishes">Dishes</Link>
          </li>
          <li>
            <Link to="/users">People</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
          {isAuthenticated && (
            <li>
              <button className="bg-c1 border drop-shadow p-2 rounded-full h-8 flex items-center">
                CREATE
              </button>
            </li>
          )}
          <li>
            <button className="flex items-center" onClick={profileOnclick}>
              <span>Pr</span>
              <img className="w-6 h-6" src="/icons/profile.svg" />
              <span>file</span>
            </button>
          </li>
          {isAuthenticated && (
            <li>
              <button className="flex items-center" onClick={handleLogout}>
                <img className="w-6 h-6" src="/icons/logout.svg" />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
