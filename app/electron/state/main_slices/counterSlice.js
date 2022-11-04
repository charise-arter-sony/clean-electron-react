const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	count: 0,
};
const counter = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: state => {
			state.count += 1;
		},
		decrement: state => {
			state.count -= 1;
		},
	},
});
module.exports = counter;
