import axios from "axios";

const API_URL = "https://finance-app-l79m.onrender.com/api/transactionType";

const getAll = async () => {
  return axios.get(API_URL);
};

const TransactionTypeService = {
  getAll,
};

export default TransactionTypeService;
