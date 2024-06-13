const AUTH_URL = 'http://localhost:3000/api/auth';

export const login = async (email, password) => {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const signup = async (data) => {
  const res = await fetch(`${AUTH_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
