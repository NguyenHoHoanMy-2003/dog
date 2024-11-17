import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header>
        <div className="navbar">
          <Link to="/">Trang chính</Link>
          <Link to="/profile">Hồ sơ</Link>
        </div>
      </header>
    </>
  );
};

export default Header;
