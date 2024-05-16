import React from "react";
import { Link, useParams } from "react-router-dom";
import { categoriesNavbar } from "./CategoriesNavbar/CategoriesNavbar";

// show categories navbar
function Navbar() {
  const { name } = useParams();

  return (
    <div className="container">
      <nav className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills">
          {categoriesNavbar.map((item, index) => (
            <li className="nav-item" key={item.id}>
              <Link
                key={index}
                to={`/categories/${item.name}`}
                className={`nav-link ${name === item.name && "active"}`}
                aria-current="page"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
