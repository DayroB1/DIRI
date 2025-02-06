import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ExampleState {
  currentTime: number;
  loading: boolean;
  error?: string;
}

const initialState: ExampleState = {
  currentTime: Date.now(),
  loading: false,
  error: undefined,
};

export const fetchNewTime = createAsyncThunk('time/fetchNewTime', async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // simulamos espera 2s
    const success = Math.random() > 0.5; // 50% posibilidades de error
    if (!success) throw new Error("Error obteniendo la hora");
    return Date.now();
    } catch (error: any) {
    return rejectWithValue(error.message);
    }
    
});

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
  //   fetchNewTime: (state) => {
  //     state.currentTime = Date.now();
  //   },

   },
   extraReducers: (builder) => {
    builder
      .addCase(fetchNewTime.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchNewTime.fulfilled, (state, action) => {
        state.currentTime = action.payload;
        state.loading = false;
      })
      .addCase(fetchNewTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error desconocido';
      });
  },
});

//export const { fetchNewTime } = timeSlice.actions;
export default timeSlice.reducer;

function rejectWithValue(message: any): any {
  throw new Error('Se ha producido un error al actualizar la hora');
}
