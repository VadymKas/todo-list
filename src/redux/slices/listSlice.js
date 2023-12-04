import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  status: '',
};

const taskSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks = [
        { id: Date.now(), title: action.payload, completed: false },
        ...state.tasks,
      ];
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title }
          : task,
      );
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTaskStatus(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      );
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    getLocalTasks(state) {
      const localTasks = localStorage.getItem('tasks');
      state.tasks = JSON.parse(localTasks);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'success';
        state.tasks = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = 'error';
        state.tasks = [];
      });
  },
});

export const fetchTasks = createAsyncThunk('todolist/fetchtasks', async () => {
  const { data } = await axios('https://jsonplaceholder.typicode.com/todos');
  return data;
});

export const { addTask, editTask, removeTask, toggleTaskStatus, getLocalTasks } =
  taskSlice.actions;

export default taskSlice.reducer;

export const tasksSelector = (state) => state.list.tasks;

export const taskTextSelector = (id) => (state) =>
  state.list.tasks.find((task) => task.id === id).title;
