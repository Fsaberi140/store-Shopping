import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ManageQty from "../../components/ManageQty";
import { Link, useNavigate } from "react-router-dom";
import { showErrorMessage } from "../../utilitis/toaster";
import { checkoutCart } from "../../redux/slices/cartSlice";
import Layout from "../../components/layout/Layout";

const CheckoutPage = () => {
  

  const cartItems = useSelector((state) => state.cartReducer.basket);
  const [isLogin, setisLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    userInfo && setisLogin(true);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  const checkoutHandle = () => {
    if (!isLogin) {
      showErrorMessage("Please Login To Checkout!");
    } else {
      navigate("/peyment");
      dispatch(checkoutCart());
    }
  };

  return (
    <Layout>
      <Container>
        <h1 className="mb-5">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Row>
            <Col md={9}>
              <div className="shadow p-3">
                {cartItems.map((item, index) => (
                  <Row
                    key={item.id}
                    className={`py-3 ${
                      index < cartItems.length - 1 && "border-bottom"
                    }`}
                  >
                    <Col>
                      <Image src={item.image} alt={item.title} fluid />
                    </Col>
                    <Col>
                      <h4>{item.title}</h4>
                      <p>Price: ${item.price}</p>
                    </Col>
                    <Col>
                      <div className="d-flex">
                        <ManageQty product={item} />
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
            </Col>
            <Col md={3}>
              <div className="summary shadow p-5 d-flex flex-column justify-content-between">
                <h4 className="mb-4">Cart Summary</h4>
                <p>Total Quantity: {calculateTotalQuantity()}</p>
                <p>Total Price: ${calculateTotalPrice()}</p>
                <div className="">
                  {!isLogin && (
                    <Link to="/login" className="btn btn-primary mb-3">
                      Login to checkout
                    </Link>
                  )}
                  <button
                    className={`btn btn-warning text-white ${
                      !isLogin && "opacity-75 text-dark"
                    }`}
                    onClick={checkoutHandle}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </Layout>
  );
};

export default CheckoutPage;
