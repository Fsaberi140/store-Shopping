import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import ProductService from "../../service/productService";
import { showErrorMessageByAxiosError } from "../../utilitis/toaster";
import defaultImage from "../../assets/images/default-placeholder.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  decreaseQty,
  increaseQty,
  removeFromBasket,
} from "../../redux/slices/cartSlice";
import ManageQty from "../ManageQty";

// component for show single product
function ProductItem({ product }) {
  const { id, image, title, category, isFav, user, price } = product;

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addToBasket({ product }));
    setQty(qty + 1);
  };
  const increaseProductQty = () => {
    dispatch(increaseQty({ id }));
    setQty(qty + 1);
  };
  const decreaseProductQty = () => {
    if (qty !== 1) {
      console.log("sfsdfsdf");
      dispatch(decreaseQty({ id }));
      setQty(qty - 1);
    } else {
      console.log("GGGGGGGGGGGGGGGGGG");
      dispatch(removeFromBasket({ id }));
      setTimeout(() => {
        setQty(qty - 1);
      }, 700);
    }
  };

  const [qty, setQty] = useState(0);
  const basket = useSelector((state) => state.cartReducer.basket);
  useEffect(() => {
    const item = basket.find((item) => item.id == id);
    item && setQty(item.qty);
  }, []);

  const fullName = user && user.firstName + " " + user.lastName;

  const [favorite, setFavorite] = useState(isFav);

  const addToFavorite = () => {
    if (favorite)
      ProductService.deleteProductFromFavoriteList(id)
        .then((res) => {
          setFavorite(false);
        })
        .catch((err) => {
          showErrorMessageByAxiosError(err);
        });
    else
      ProductService.addProductToFavoriteList(id)
        .then((res) => {
          setFavorite(true);
        })
        .catch((err) => {
          showErrorMessageByAxiosError(err);
        });
  };

  // da wird produkt angezeigt (image+ title )
  return (
    <div className="col  text-black ">
      <div className="card h-100 ">
        {/* image wird angezeigt: */}
        <Link to={`/product-details/${id}`} className="text-decoration-none">
          <img
            src={image ? image : defaultImage}
            className="card-img-top image-card"
            alt="..."
          />
        </Link>

        <div className="card-body">
          <div className="d-flex justify-content-between">
            <Link
              to={`/product-details/${id}`}
              className="text-decoration-none"
            >
              {/* title wird angezeigt: */}
              <h5 className="card-title">{title}</h5>
            </Link>

            {/* wenn es favorite ist, Herz wird full angezeigt: */}
            {favorite ? (
              <i
                className="bi  bi-heart-fill text-danger"
                onClick={addToFavorite}
              ></i>
            ) : (
              <i className="bi bi-heart" onClick={addToFavorite}></i>
            )}
          </div>
          <p className="username ">
            <span className="text-muted">User: </span>
            {fullName}
          </p>
          <p className="username ">
            <span className="text-muted">Category: </span>
            {category}
          </p>

          <p className="card-text description">Price: {price}$</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <Link
            className="btn btn-warning text-white text-decoration-none"
            to={`/product-details/${id}`}
          >
            Details
          </Link>
          <ManageQty product={product}/>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
