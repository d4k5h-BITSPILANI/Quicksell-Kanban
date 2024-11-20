import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  users:[],
  status: 'idle',
  error: null,
};

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
  const data = await response.json();
  return data; 
});


const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = action.payload.tickets;
        state.users = action.payload.users;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default ticketsSlice.reducer;
