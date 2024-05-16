import React, { useEffect, useState } from "react";
import AdminService from "../../service/adminService";
import { showErrorMessageByAxiosError } from "../../utilitis/toaster";
import moment from "moment";
import AdminPanelLayout from "../../components/layout/AdminPanelLayout";

// admin page for show list of all carts
const AdminOrderListPage = () => {
  // all carts state
  const [data, setData] = useState([]);

  // fetch cart list
  useEffect(() => {
    AdminService.getCarts()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => showErrorMessageByAxiosError(err));
  }, []);

  return (
    <AdminPanelLayout>
      <h3> All Carts list</h3>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Title</th>
            <th>Product Owner</th>
            <th>Product Requester</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td>
                <img src={item.product.image} height={30} />
              </td>
              <td>{item.product.title}</td>
              <td>
                {item.productOwner.firstName + " " + item.productOwner.lastName}
              </td>
              <td>
                {item.productRequester.firstName +
                  " " +
                  item.productRequester.lastName}
              </td>
              <td>
              </td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminPanelLayout>
  );
};

export default AdminOrderListPage;
