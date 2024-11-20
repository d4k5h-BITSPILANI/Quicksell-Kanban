import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './titcketsSlice'

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});

export default store;
