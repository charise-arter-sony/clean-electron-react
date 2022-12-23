import React, { useState } from 'react';
import { useEffect } from 'react';
// import AlertTest from './components/AlertTest';
// import NativeOpen from './components/NativeOpen';

function App() {
	// stuff from video to understand ipc
	const [nodeAlert, setNodeAlert] = useState('');
	const [count, setCount] = useState(0);
	useEffect(() => {
		window.api.receive('helloWorld', (data) => {
			console.log(`Node Alert Data: ${data}`);
			setNodeAlert(data);
		});

		// make sure to use useState Hook
		window.api.receive('count', (data) => {
			setCount(data);
			// count should update every second... when main sends message
		});
	}, []);

	// Renderer to main

	// variable set in main also set here in renderer
	const [customMsg, setCustomMsg] = useState(
		'Hello from the renderer process in React'
	);

	const sendToMain = () => {
		// possibly put in use effect to do automatically
		// call function in preload to send message to MAIN
		window.api.sendMsgToMain(customMsg);
	};
	return (
		<div>
			<hr />
			<h1> Count: {count} </h1>
			<br />
			Custom Message: {customMsg}
			<br />
			<button onClick={sendToMain}>
				Send Message TO Main: Renderer to Main
			</button>
			<br />
			<button> Get message FROM Main: Main to Renderer </button>
			<hr />
			<h2> Alert Message tester</h2>
			<h3> Node Alert: {nodeAlert}</h3>
		</div>
	);
}

export default App;
