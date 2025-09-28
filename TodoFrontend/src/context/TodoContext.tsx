import axios, { type AxiosResponse } from 'axios';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

const api = axios.create({
  baseURL: 'http://localhost:5000/api/todos',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`Response received: ${response.status} ${response.statusText}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      const message = error.response.data?.message || `HTTP error! status: ${error.response.status}`;
      throw new Error(message);
    } else if (error.request) {
      throw new Error('Network error - no response from server');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await api.get<Todo[]>('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw new Error('Failed to fetch todos');
  }
}

export async function addTodo(title: string): Promise<Todo> {
  try {
    const response = await api.post<Todo>('', { title });
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw new Error('Failed to add todo');
  }
}

export async function updateTodo(id: string, title: string): Promise<Todo> {
  try {
    const response = await api.put<Todo>(`/${id}`, { title });
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw new Error('Failed to update todo');
  }
}

export async function deleteTodo(id: string): Promise<void> {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw new Error('Failed to delete todo');
  }
}

export async function toggleTodo(id: string, completed: boolean): Promise<Todo> {
  try {
    const response = await api.patch<Todo>(`/${id}/toggle`, { isDone: completed });
    return response.data;
  } catch (error) {
    console.error('Error toggling todo:', error);
    throw new Error('Failed to toggle todo');
  }
}
