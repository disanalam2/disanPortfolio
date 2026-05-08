const BASE_URL = 'https://d3sh63r9ecih9a.cloudfront.net/api';
const BASE_URL = 'http://localhost:5000/api'; // Local development ke liye
export const apiCall = async (endpoint, options = {}) => {
  // sessionStorage se token lete hain (updated from localStorage)
  let token = sessionStorage.getItem('adminToken');
  
  const headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    ...(options.headers || {}),
  };

  // FIX 1: Sirf POST/PUT requests me Content-Type bhejenge taaki GET par CORS error na aaye
  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    // FIX 2: Token ke aaspas agar extra quotes save ho gaye hain to hata dega
    token = token.replace(/^"(.*)"$/, '$1');
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // FIX 3: Agar token invalid/expire hai (401 ya 403), toh auto-logout karo
  if (response.status === 401 || response.status === 403) {
    sessionStorage.removeItem('adminToken');
    alert("Aapka Admin session expire ho gaya hai. Kripya wapas login karein!");
    window.location.hash = '#/admin';
    window.location.reload();
    throw new Error("Session expired");
  }

  return response.json();
};