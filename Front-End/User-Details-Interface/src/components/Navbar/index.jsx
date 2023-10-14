import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <h1>User Details</h1>
      <div className="nav-elements">
        <h2>
          <NavLink className="nav-element-1" to="/">
            Users
          </NavLink>
        </h2>
      </div>
    </div>
  );
};

export default Navbar;
