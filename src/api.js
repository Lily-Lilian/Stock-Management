import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 60000, // 60 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

const handleRequest = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// Authentication
export const login = async (username, password) => {
    const response = await axios.post("/api/login", { username, password });
    return response.data;
}
  
export const signup = (username, password, role) =>
  handleRequest(() => apiClient.post("/signup", { username, password, role }));

// Stock Management
export const addItem = (name, quantity) =>
  handleRequest(() => apiClient.post("/addItem", { name, quantity }));

export const sellItem = (item_name, quantity_to_sell) =>
  handleRequest(() => apiClient.post("/sellItem", { item_name, quantity_to_sell }));

export const getAllItems = () =>
  handleRequest(() => apiClient.get("/items"));

export const getTotalItemsSold = async () => {
    const response = await axios.get("/api/total-sold");
    return response.data.total_sold;
  };
  
  export const getLowStockAlerts = async () => {
    const response = await axios.get("/api/low-stock");
    return response.data;
  };
  