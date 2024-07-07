import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/transactions/";

const create = async (transaction) => {
  const user = AuthService.getCurrentUser();
  return axios.post(API_URL, transaction, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
};

const getAll = async () => {
  const user = AuthService.getCurrentUser();
  return axios.get(`${API_URL}user/${user.id}`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
};

const TransactionService = {
  create,
  getAll,
};

export default TransactionService;
