import { io } from 'socket.io-client';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const socket = io('http://127.0.0.1:3500/');

const initialState = {
  fetching : false,
  roomId : '',
  messages : [],
  members : [],
  totalMessages : 0,
  pageNo : 0,
};

export const getRoomDetails = createAsyncThunk(
  'room/details',
  async({roomId,accessToken},thunkAPI)=>{
    console.log(roomId);
    const res = await axios.get('http://127.0.0.1:3500/room/details',{
      headers : { 
        room_id : roomId,
        authorization : `Bearer ${accessToken}`
      },
    });
    socket.emit('setChat',roomId);

    if( res.status!==200 )
      return thunkAPI.rejectWithValue('room not updated');
    // console.log(res.data);
    return res.data;
  }
);

export const getNextMessage = createAsyncThunk(
  'room/next',
  async ()=>{
    
  }
)

const roomSlice = createSlice({
  name : 'room',
  initialState,
  reducers : {
    appendMessage : (state,{payload})=>{
      // console.log(payload);
      state.messages.push(payload);
      return state;
    },
  },
  extraReducers : {
    [getRoomDetails.pending] : (state)=>{
      state.fetching = true;
    },
    [getRoomDetails.fulfilled] : (state,{payload})=>{
      state.fetching = false;
      // console.log(payload);
      state.roomId = payload._id;
      state.messages = payload.messages;
      state.members = payload.members;
      // state.totalMessages = totalMessages;
      state.pageNo = 1;
    },
    [getRoomDetails.rejected] : (state)=>{
      state.fetching = false;
    }
  }
});

export default roomSlice.reducer;
export const { appendMessage } = roomSlice.actions;