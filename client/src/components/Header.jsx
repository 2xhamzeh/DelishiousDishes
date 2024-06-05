import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-c4 flex flex-auto justify-between items-center p-2">
      <Link to="/">
        <h1 className=" font-bold text-2xl">Delishious Dishes</h1>
      </Link>
      <nav>
        <ul className="flex gap-3 font-bold">
          <li>
            <Link to="/dishes">Dishes</Link>
          </li>
          <li>
            <Link to="/users">People</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
