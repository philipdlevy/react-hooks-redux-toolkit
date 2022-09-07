// src/features/cats/catsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCats = createAsyncThunk("cats/fetchCats", () => {
  // return a Promise containing the data we want
  debugger
  return fetch("https://learn-co-curriculum.github.io/cat-api/cats.json")
    .then((response) => response.json())
    .then((data) => data.images);
});

const catsSlice = createSlice({
  name: "cats",
  initialState: {
    entities: [], // array of cats
    status: "idle", // loading state
  },
  reducers: {
    catAdded(state, action) {
      // using createSlice lets us mutate state!
      state.entities.push(action.payload);
    },
    catUpdated(state, action) {
      const cat = state.entities.find((cat) => cat.id === action.payload.id);
      cat.url = action.payload.url;
    },
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchCats.pending](state) {
      state.status = "loading";
    },
    [fetchCats.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { catAdded, catUpdated } = catsSlice.actions;

export default catsSlice.reducer;

// function catsReducer(state = initialState, action) {
//   switch (action.type) {
//     // sync actions
//     case "cats/catAdded":
//       return {
//         ...state,
//         entities: [...state.entities, action.payload],
//       };
//     case "cats/catUpdated":
//       return {
//         ...state,
//         entities: state.entities.map((cat) =>
//           cat.id === action.payload.id ? action.payload : cat
//         ),
//       };

//     // async actions
//     case "cats/fetchCats/pending":
//       return {
//         ...state,
//         status: "loading",
//       };
//     case "cats/fetchCats/fulfilled":
//       return {
//         ...state,
//         entities: action.payload,
//         status: "idle",
//       };

//     default:
//       return state;
//   }
// }

// export default catsReducer;
