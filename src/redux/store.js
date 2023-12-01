import { configureStore } from '@reduxjs/toolkit';
import list from './slices/listSlice';

const store = configureStore({
  reducer: {
    list,
  },
});

export default store;
