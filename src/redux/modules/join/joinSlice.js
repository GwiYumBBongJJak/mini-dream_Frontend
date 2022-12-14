import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER;

const initialState = {
	nickname: null,
	statusMessage: null,
	statusCode: null,
	isLogin: null,
	isLoading: false,
	error: null,
	// 각 API에 대한 상태값이 별도로 필요하다.
};

export const __requestSignUp = createAsyncThunk(
	"join/requestSignUp",
	async (payload, thunkAPI) => {
		try {
			console.log("requestSignUp payload =>", payload);
			const response = await axios.post(`${BASE_URL}/member/register`, payload);

			console.log("requestSignUp response.data =>", response.data);

			return thunkAPI.fulfillWithValue(response.data);
		} catch (error) {
			console.log("requestSignUp error =>", error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const __requestSignIn = createAsyncThunk(
	"join/requestSignIn",
	async (payload, thunkAPI) => {
		try {
			console.log("requestSignIn payload =>", payload);
			console.log();
			const response = await axios.post(`${BASE_URL}/member/login`, payload);

			console.log("requestSignIn response =>", response);

			return thunkAPI.fulfillWithValue(response.data);
		} catch (error) {
			console.log("requestSignIn error =>", error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

// 유저 정보를 가져오기
export const __getUserInfo = createAsyncThunk(
	"join/getUserInfo",
	async (payload, thunkAPI) => {
		try {
			const token = localStorage.getItem("jwtToken");
			console.log("getUserInfo token =>", token);
			const response = await axios.get(`${BASE_URL}/auth/member/info`, {
				headers: { Authorization: `${token}` },
			});
			console.log("getUserInfo response =>", response);
			return thunkAPI.fulfillWithValue(response.data);
		} catch (error) {
			console.log("getUserInfo error =>", error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

const joinSlice = createSlice({
	name: "join",
	initialState,
	reducers: {
		setLogout: (state, _) => {
			state.isLogin = false;
		},
		setStatusCode: (state, _) => {
			state.statusCode = null;
		},
	},

	extraReducers: {
		// 회원가입
		[__requestSignUp.pending]: (state, _) => {
			console.log("__requestSignUp.pending");
			state.isLoading = true;
		},
		[__requestSignUp.fulfilled]: (state, action) => {
			console.log("__requestSignUp.fulfilled =>", action.payload);
			state.isLoading = false;
			state.statusCode = action.payload.statusCode;
			state.statusMessage = action.payload.msg;
			state.user = action.payload;
		},
		[__requestSignUp.rejected]: (state, action) => {
			console.log("__requestSignUp.rejected =>", action.payload);
			state.isLoading = false;
			state.statusCode = action.payload.statusCode;
			state.statusMessage = action.payload.msg;
			state.error = action.payload;
		},
		// 로그인
		[__requestSignIn.pending]: (state, _) => {
			console.log("__requestSignIn.pending =>");
			state.isLoading = true;
		},
		[__requestSignIn.fulfilled]: (state, action) => {
			console.log("__requestSignIn.fulfilled =>", action.payload);
			localStorage.setItem("jwtToken", action.payload.accessToken);
			localStorage.setItem("nickname", action.payload.nickname);
			state.isLoading = false;
			state.nickname = action.payload.nickname;
			state.isLogin = true;
			// 여기도 statusCode로 통일
			state.statusCode = action.payload.statusCode;
			state.statusMessage = action.payload.msg;
		},
		[__requestSignIn.rejected]: (state, action) => {
			console.log("__requestSignIn.rejected =>", action.payload);
			state.isLoading = false;
			state.statusCode = action.payload.statusCode;
			state.statusMessage = action.payload.msg;
			state.error = action.payload;
		},
		// 사용자 정보 가져오기
		[__getUserInfo.pending]: (state, _) => {
			console.log("__getUserInfo.pending =>");
			state.isLoading = true;
		},
		[__getUserInfo.fulfilled]: (state, action) => {
			console.log("__getUserInfo.fulfilled =>", action.payload);
			state.isLoading = false;
			state.nickname = action.payload.msg;
			state.isLogin = true;
		},
		[__getUserInfo.rejected]: (state, action) => {
			console.log("__getUserInfo.rejected =>", action.payload);
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { setLogout, setStatusCode } = joinSlice.actions;
export default joinSlice.reducer;
