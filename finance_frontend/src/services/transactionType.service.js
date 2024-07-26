import axios from "axios";

const API_URL = "http://localhost:8080/api/transactionType";

const getAll = async () => {
  return axios.get(API_URL);
};

const TransactionTypeService = {
  getAll,
};

export default TransactionTypeService;
