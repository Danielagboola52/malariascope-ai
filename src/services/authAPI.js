// src/services/authAPI.js
const API_BASE_URL = 'http://localhost:5001/api/auth'; // Changed from 5000 to 5001

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg || data.error || 'Something went wrong');
  }
  return data;
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get current user (if you need to verify token)
export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Logout (client-side token removal)
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};