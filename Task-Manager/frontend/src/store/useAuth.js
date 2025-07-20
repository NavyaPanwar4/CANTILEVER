import { create } from "zustand";

const useAuth = create((set) => ({
  accessToken: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuth: !!localStorage.getItem("token"),

  login: ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ accessToken: token, user, isAuth: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ accessToken: null, user: null, isAuth: false });
  },
}));

export default useAuth;
