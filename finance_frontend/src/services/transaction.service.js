import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/transaction/";

const create = async (transaction) => {
  const token = localStorage.getItem("token");

  return axios.post(API_URL, transaction, {
    headers: { "x-access-token": token },
  });
};

const getAll = async () => {
  const user = AuthService.getCurrentUser();
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}user/${user.id}`, {
    headers: { "x-access-token": token },
  });
};

const TransactionService = {
  create,
  getAll,
};

export default TransactionService;
