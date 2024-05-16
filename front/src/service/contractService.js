import myAxios from "./api";

// list of data fetches for carts
const CartService = {
  newCart: (body) => {
    return myAxios.post(`/cart/newCart`, body);
  },
  myRequest: () => {
    return myAxios.get("cart/myRequest");
  },
  requestedList: () => {
    return myAxios.get("cart/requestedList");
  },
  acceptRequest: (id, description) => {
    return myAxios.post(`cart/acceptRequest/${id}`, { description });
  },
  rejectedRequest: (id, reason) => {
    return myAxios.post(`cart/rejectedRequest/${id}`, { reason });
  },
  getRequestDetail(id) {
    return myAxios.get(`cart/${id}`);
  },
};

export default CartService;
