import axios from "axios";

export default {
  // create a new account
  createAccount: (accountData) => {
    return axios.post("/api/account/create", accountData);
  },
  createOrder: (orderData) => {
    return axios.post("/api/order/create", orderData);
  },
  getReceipt: (id) => {
    return axios.get("/api/order/invoice/" + id);
  },
  // get account info based of account ID
  getAccountByID: (id) => {
    return axios.get("/api/account/" + id);
  },
  // udpate account info based of account ID
  updateAccountByID: (id, accountData) => {
    return axios.put("/api/account/" + id, accountData);
  },
  getProducts: () => {
    return axios.get("/api/products/all");
  },
  getProductByID: (id) => {
    return axios.get("/api/product/" + id);
  },
  login: (accountData) => {
    return axios.get("/api/user/login", accountData);
  },

};
