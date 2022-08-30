import { io } from 'socket.io-client';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const socket = io(' https://sheltered-stream-49666.herokuapp.com/',{
  autoConnect : false,
  // reconnectionAttempts : 3
  reconnection : false
});

const initialState = {
  fetching : false,
  roomimg : '',
  name : '',
  roomId : '',
  messages : [],
  totalMessages : 0,
  pageNo : 0,
};

export const getRoomDetails = createAsyncThunk(
  'room/details',
  async({roomId,accessToken,roomimg,name},thunkAPI)=>{
    console.log(roomId);
    const res = await axios.get(' https://sheltered-stream-49666.herokuapp.com/room/details',{
      headers : { 
        room_id : roomId,
        authorization : `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin' : '*',
      },
    });
    socket.emit('setChat',roomId);

    if( res.status!==200 )
      return thunkAPI.rejectWithValue('room not updated');
    // console.log(res.data);
    return {...res.data,roomId,roomimg,name};
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
      state.roomId = payload.roomId;
      state.name = payload.name;
      state.roomimg = payload.roomimg;
      state.messages = payload.messages;
      state.pageNo = 1;
    },
    [getRoomDetails.rejected] : (state)=>{
      state.fetching = false;
    }
  }
});

export default roomSlice.reducer;
export const { appendMessage } = roomSlice.actions;