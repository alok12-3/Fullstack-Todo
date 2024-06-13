const API_URL = 'http://localhost:3000/api/todos';

export const getTodos = async (token) => {
  const res = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return res.json();
};

export const addTodo = async (todo, token) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const updateTodo = async (id, todo, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const deleteTodo = async (id, token) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
