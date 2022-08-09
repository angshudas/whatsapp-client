import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { useSelector } from '@reduxjs/toolkit';

const initialState = {
  joinedChats : [],
};

export const getAllChats = createAsyncThunk(
  'user/getChats',
  async({accessToken},thunkAPI)=>{
    let res = await axios.get('http://127.0.0.1:3500/chat/allchats',{headers : {authorization : `Bearer ${accessToken}`}});


    console.log(res.data);
    if( res.status!==200 )
      return thunkAPI.rejectWithValue('kdk');
    return res.data.user;
  }
);

export const addNewChat = createAsyncThunk(
  '/chat/newchat',
  async ({friend,accessToken},thunkAPI)=>{
    console.log('here');
    const res = await axios.post('http://127.0.0.1:3500/chat/newchat',
      {friend},
      {headers : {authorization : `Bearer ${accessToken}`}},
      
    );

    console.log(res.data);

    if( res.status!==200 )
      return thunkAPI.rejectWithValue('something went wrong');

    return res.data;

  }
)

const chatSlice = createSlice({
  name : 'chat',
  initialState,
  reducers : {
    addChat : ()=>{

    },
    blockChat : ()=>{

    },
    unblockChat : ()=>{

    },
    createChat : ()=>{

    }
  },
  extraReducers : {
    [getAllChats.pending]: (state)=>{
      // state.isLoading = true;
      // console.log('pending');
    },
    [getAllChats.fulfilled]: (state,{payload})=>{
      // state.isLoading = false;
      state.joinedChats = JSON.parse(JSON.stringify(payload.joinedChats));
      console.log(state.joinedChats,'joined chat');
    },
    [getAllChats.rejected]: (state)=>{
      console.log('rejected');
      // state.isLoading = false;
    },
    [addNewChat.fulfilled]: (state,{payload})=>{

      state.joinedChats.push({ _id : payload._id,members: payload.members });
      console.log(payload,'fulfilled');
    },
    [addNewChat.rejected]: (state)=>{
      console.log('rejected');
      // state.isLoading = false;
    },
  }
});

export default chatSlice.reducer;
export const { addChat,blockChat,unblockChat,createChat } = chatSlice.actions;