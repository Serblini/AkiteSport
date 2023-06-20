import axios from "axios";

const BASE_API_URL = "http://localhost:5000"; // Замените на URL вашего API

interface User {
  email: string;
  password: string;
}

class MyApi {
  static async getUsers() {
    const result = await axios.get(`${BASE_API_URL}/users`);
    return result.data;
  }

  static async addUser(newUser: User) {
    const result = await axios.post(`${BASE_API_URL}/users`, newUser);
    return result.data;
  }

  static async getUserByEmail(email: string) {
    const result = await axios.get(`${BASE_API_URL}/users?email=${email}`);
    return result.data;
  }
  
}

export default MyApi;
