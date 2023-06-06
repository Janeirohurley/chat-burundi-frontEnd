import { createSlice } from '@reduxjs/toolkit';
 const AllChat = createSlice({
    name: "AllChat",
    initialState: [] ,
    reducers: {
        GetAll : (state,action)=> {
             return action.payload;
        },
    }
})
export const GetAllChat = AllChat.actions
export default AllChat.reducer;