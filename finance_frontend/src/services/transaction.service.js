import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/transaction/";

const create = async (transaction) => {
  console.log(transaction);
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

const get = async (id) => {
  const user = AuthService.getCurrentUser();
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}${id}`, {
    headers: { "x-access-token": token },
  });
};

const updateTransaction = async (id, transaction) => {
  const user = AuthService.getCurrentUser();
  const token = localStorage.getItem("token");
  return axios.put(`${API_URL}${id}`, transaction, {
    headers: { "x-access-token": token },
  });
};

const deleteTransaction = async (id) => {
  const user = AuthService.getCurrentUser();
  const token = localStorage.getItem("token");
  return axios.delete(`${API_URL}${id}`, {
    headers: { "x-access-token": token },
  });
};

const TransactionService = {
  create,
  getAll,
  get,
  updateTransaction,
  deleteTransaction,
};

export default TransactionService;
