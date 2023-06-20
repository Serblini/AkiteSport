import { makeAutoObservable } from "mobx";
import MyApi from "../middleware/api";

interface User {
  email: string;
  password: string;
}

export class AuthStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getUserByEmail(email: string) {
    return await MyApi.getUserByEmail(email);
  }

  async addUser(newUser: User) {
    return await MyApi.addUser(newUser);
  }

  setUser(user: User | null) {
    this.user = user;
  }
}

export const authStore = new AuthStore();
