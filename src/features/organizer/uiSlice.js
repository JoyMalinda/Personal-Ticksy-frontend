import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // ✅ Modal states
  modals: {
    showCreateEventModal: false,
    showTicketForm: false,
    showDeleteConfirm: false,
  },

  // ✅ Tabs per event (e.g. attendees | checkin | stats)
  activeEventTabs: {}, // { [eventId]: 'attendees' | 'checkin' | 'stats' }

  // ✅ Toast messages (feedback)
  toast: {
    show: false,
    type: "success", // "success" | "error" | "info"
    message: "",
  },

  // ✅ Sort settings per section
  sortOptions: {
    upcoming: "latest",  // or "highestRevenue", etc.
    history: "oldest",
    reviews: "newest",
  },

  // ✅ Filter settings (e.g. by star rating)
  filterOptions: {
    reviews: null, // e.g. 5, 4, 3, etc. | null = all
  },

  // ✅ Optional loading states
  loading: {
    checkinTab: false,
    attendeesTab: false,
    reviewsTab: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Toggle specific modal visibility
    setModalState: (state, action) => {
      const { modal, value } = action.payload;
      if (modal in state.modals) {
        state.modals[modal] = value;
      }
    },

    // Set active tab for a specific event
    setActiveEventTab: (state, action) => {
      const { eventId, tab } = action.payload;
      state.activeEventTabs[eventId] = tab;
    },

    // Show toast message
    showToast: (state, action) => {
      const { type, message } = action.payload;
      state.toast = {
        show: true,
        type,
        message,
      };
    },

    // Hide toast
    hideToast: (state) => {
      state.toast.show = false;
      state.toast.message = "";
    },

    // Update sorting settings
    setSortOption: (state, action) => {
      const { section, value } = action.payload;
      state.sortOptions[section] = value;
    },

    // Update filter settings
    setFilterOption: (state, action) => {
      const { section, value } = action.payload;
      state.filterOptions[section] = value;
    },

    // Set loading state
    setLoadingState: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
  },
});

export const {
  setModalState,
  setActiveEventTab,
  showToast,
  hideToast,
  setSortOption,
  setFilterOption,
  setLoadingState,
} = uiSlice.actions;

export default uiSlice.reducer;
