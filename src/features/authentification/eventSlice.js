import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axiosInstance"; // Adjust based on your structure

// ========== Async Thunks ==========

// Fetch events by status (upcoming, pending, rejected, past)
export const fetchEventsByStatus = createAsyncThunk(
  "events/fetchByStatus",
  async (status, thunkAPI) => {
    try {
      const res = await axios.get(`/events?status=${status}`);
      return { status, events: res.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create new event
export const createEvent = createAsyncThunk(
  "events/create",
  async (eventData, thunkAPI) => {
    try {
      const res = await axios.post("/events", eventData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update existing (rejected) event
export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ eventId, updatedData }, thunkAPI) => {
    try {
      const res = await axios.put(`/events/${eventId}`, updatedData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ========== Initial State ==========

const initialState = {
  upcomingEvents: [],
  pendingEvents: [],
  rejectedEvents: [],
  pastEvents: [],
  currentEventDetails: null,

  status: {
    fetch: "idle", // or "loading" | "succeeded" | "failed"
    create: "idle",
    update: "idle",
  },

  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCurrentEvent: (state, action) => {
      state.currentEventDetails = action.payload;
    },
    clearCurrentEvent: (state) => {
      state.currentEventDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsByStatus.pending, (state) => {
        state.status.fetch = "loading";
        state.error = null;
      })
      .addCase(fetchEventsByStatus.fulfilled, (state, action) => {
        const { status, events } = action.payload;
        state.status.fetch = "succeeded";
        state.error = null;

        if (status === "upcoming") state.upcomingEvents = events;
        else if (status === "pending") state.pendingEvents = events;
        else if (status === "rejected") state.rejectedEvents = events;
        else if (status === "past") state.pastEvents = events;
      })
      .addCase(fetchEventsByStatus.rejected, (state, action) => {
        state.status.fetch = "failed";
        state.error = action.payload;
      })

      // Create event
      .addCase(createEvent.pending, (state) => {
        state.status.create = "loading";
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.pendingEvents.push(action.payload); // New event goes to pending
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status.create = "failed";
        state.error = action.payload;
      })

      // Update event
      .addCase(updateEvent.pending, (state) => {
        state.status.update = "loading";
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        // Replace updated event in rejectedEvents
        const idx = state.rejectedEvents.findIndex(e => e.id === action.payload.id);
        if (idx !== -1) {
          state.rejectedEvents[idx] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status.update = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCurrentEvent, clearCurrentEvent } = eventSlice.actions;

export default eventSlice.reducer;
