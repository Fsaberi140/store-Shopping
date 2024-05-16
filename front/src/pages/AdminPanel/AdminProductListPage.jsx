import React, {useEffect, useState} from 'react';
import AdminService from "../../service/adminService";
import {showErrorMessageByAxiosError} from "../../utilitis/toaster";
import { Link } from "react-router-dom";
import AdminPanelLayout from '../../components/layout/AdminPanelLayout';

// admin page for show list of all products
const AdminProductListPage = () => {
  // all products state
  const [data, setData] = useState([]);

  // fetch product list
  useEffect(() => {
    AdminService.getProducts()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => showErrorMessageByAxiosError(err));
  }, []);

  return (
    <AdminPanelLayout>
      <Link
        className="btn btn-warning my-4 color "
        to="/admin-panel/create-edit-product-form/"
      >
        Add New Product
      </Link>
      <h3>All Products list</h3>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} height={30} />
              </td>
              <td>{item.title}</td>
              <td>{item.category.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminPanelLayout>
  );
};

export default AdminProductListPage;
