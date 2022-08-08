import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
  username : '',
  userState : 'loggedout',
  email : '',
  accessToken : '',
  isLoading : false,
  userimg : '',
  room : "",
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async({setLoggedIn,email,password},thunkAPI)=>{
    const res = await axios.post('http://127.0.0.1:3500/user/login',{email,password},{ withCredentials : true });
    console.log(res.data);
    if( res.status===200 ){
      setLoggedIn(true);
      return res.data;
    }
    else 
      return thunkAPI.rejectWithValue('kdkd');
  }
);


export const refresh = createAsyncThunk(
  'user/refresh',
  async(setTried,thunkAPI)=>{
    setTried(true);
    const res = await axios.get('http://127.0.0.1:3500/auth/refresh',{withCredentials:true});
    if( res.status!==200 )
      return thunkAPI.rejectWithValue('refresh not found');
    
    console.log(res.data);
    return res.data;
  }
);

export const updateUser = createAsyncThunk(
  'user/updatedetails',
  async({myuser,accessToken,setUpdated},thunkAPI)=>{
    const res = await axios.post('http://127.0.0.1:3500/user/update/details',
      myuser,
      {headers : {authorization : `Bearer ${accessToken}`}},
    );
    // console.log(res);
    if( res.status!==200 )
      return thunkAPI.rejectWithValue('not updated');

    setUpdated(true);
    return res.data;
  }
)

export const updatePassword = createAsyncThunk(
  'user/updatepassword',
  async({ data,setUpdated,accessToken },thunkAPI)=>{
    const res = await axios.post('http://127.0.0.1:3500/user/update/password',
      data,
      {headers : {authorization : `Bearer ${accessToken}`}},
    );
    console.log(res);
    if( res.status!==200 )
      return thunkAPI.rejectWithValue('not updated');

    setUpdated(true);
    return res.data;
  }
  
)

const userSlice = createSlice({
  name : 'user',
  initialState,
  reducers :{
    change : (state)=>{
      return state;
    },
    updateRoom : (state,{payload})=>{
      state.room = payload;
      return state;
    }
  },
  extraReducers : {
    [fetchUser.pending] : (state)=>{
      state.isLoading = true;
      // console.log('peding');
    },
    [fetchUser.fulfilled] : (state,{ payload })=>{
      state.isLoading = false;
      state.accessToken = payload.accessToken;
    },
    [fetchUser.rejected] : (state)=>{
      state.isLoading = true;
      state.tried = true;
      // console.log('rejected');
    },
    [refresh.pending] : (state)=>{
      state.isLoading = true;
      // console.log('pending');
    },
    [refresh.fulfilled] : (state,{payload})=>{
      state.username = payload.username;
      state.email = payload.email;
      state.accessToken = payload.accessToken;
      state.isLoading = false;
      state.userState = 'loggedin';
      state.userimg = payload.userimg;
      // console.log('fulfilled');

    },
    [refresh.rejected] : (state)=>{
      // console.log('rejected');
      state.isLoading = false;
      
    },
    [updateUser.fulfilled] : (state,{payload})=>{
      console.log('payload',payload,'fulfilled');
      state.username = payload.username;
      state.userimg = payload.userimg;
      state.email = payload.email;
    },
    [updateUser.rejected] : (state)=>{
      console.log('rejected');
      // state.isLoading = false;
      
    },
    [updatePassword.fulfilled] : (state)=>{
      console.log('fulfilled');
      // state.isLoading = false;
      
    },
    [updatePassword.rejected] : (state)=>{
      console.log('rejected');
      // state.isLoading = false;
      
    },
    
  }
});

export default userSlice.reducer;
export const { change,updateRoom } = userSlice.actions;