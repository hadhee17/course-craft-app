// src/services/authServices.js
import api from "./api";

// ✅ Get currently logged-in user
export async function getCurrentUser() {
  const res = await api.get("/users/me");
  return res.data.data.user;
}

// ✅ Login with email & password
export async function loginUser(email, password) {
  const res = await api.post("/users/login", { email, password });
  return res.data.data.user;
}

// ✅ Signup (register new user)
export async function signupUser(payload) {
  const res = await api.post("/users/signup", payload);
  return res.data.data.user;
}

// ✅ Logout user (clears cookie/JWT on backend)
export async function logoutUser() {
  await api.post("/users/logout");
  return true;
}

// ✅ Start Google OAuth (redirects to backend)
export function loginWithGoogle() {
  window.location.href = "http://localhost:3000/api/v1/users/google";
}
