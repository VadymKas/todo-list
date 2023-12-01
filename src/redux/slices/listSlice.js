import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks = [
        ...state.tasks,
        { id: Date.now(), description: action.payload, completed: false },
      ];
    },
    editTask(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, description: action.payload.description }
          : task,
      );
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskStatus(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      );
    },
  },
});

export const { addTask, editTask, removeTask, toggleTaskStatus } =
  taskSlice.actions;

export default taskSlice.reducer;

export const tasksSelector = (state) => state.list.tasks;

export const taskTextSelector = (id) => (state) =>
  state.list.tasks.find((task) => task.id === id).description;
