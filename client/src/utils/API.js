import axios from "axios";

// need to use .env file to have DL/ML/RL API endpoints
const API_BASE_URL = process.env.REACT_APP_BASE_API_URL;

export default {
  // create a new account
  createAccount: (accountData) => {
    return axios.post(API_BASE_URL + "/api/account/create", accountData);
  },
  // get account info based of account ID
  getAccountByID: (id) => {
    return axios.get(API_BASE_URL + "/api/account" + id);
  },
  // udpate account info based of account ID
  updateAccountByID: (id, accountData) => {
    return axios.put(API_BASE_URL + "/api/account" + id, accountData);
  },

};
