const { configureStore } = require('@reduxjs/toolkit');
const counter = require('./main_slices/counterSlice');
const store = configureStore({
	reducer: {
		counter: counter.reducer,
	},
});
module.exports = store;
