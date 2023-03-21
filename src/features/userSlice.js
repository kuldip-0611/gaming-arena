import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  duplicate_users:[],
  error: "",
};

/* This is used to fetch the data from the API. */
export const fetchData = createAsyncThunk("user/fetchData", () => {
  return axios
    .get(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
    )
    .then((response) => response.data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /* This function is used to filter the data based on the platform. */
    fetchOprtionData: (state, action) => {
      state.duplicate_users=[] 
      if(action.payload === 'All'){
        state.duplicate_users = state.users
      }
      else{
        state.users.map((item) => {
          if (item.platform === action.payload) {
            console.log(true);
            state.duplicate_users.push(item);
          } else {
            return null;
          }
          return item
        });
      }

      
    },
   /* A reducer function which is used to filter the data based on the search input. */
    fetchSearchData:(state,action) =>{
      state.duplicate_users=[]
        state.users.map((item) => {
            if (item.title === action.payload) {
              console.log(true);
              state.duplicate_users.push(item);
            } else {
              return null;
            }
            return item
          });
          
    
          
    },
    /* This function is used to reset the data to the initial state. */
    resetData:(state=>{
      state.duplicate_users = state.users;
      state.users = state.duplicate_users;
    })
  },
  /* This is used to handle the asynchronous actions. */
  extraReducers: (biulder) => {
    biulder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    biulder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.duplicate_users = action.payload;
      state.error = "";
    });
    biulder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const { fetchOprtionData ,fetchSearchData,resetData} = userSlice.actions;
