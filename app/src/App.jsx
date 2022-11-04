import React, { useState } from 'react';
import NativeOpen from './components/NativeOpen';
import NodeTest from './components/NodeTest';
import Counter from './components/Counter';

function App() {
	const [filePath, setFilePath] = useState([]);
	const [count, setCount] = useState(5);

	// Message response Test
	window.api.receive('test-succeeded', () => {
		console.log('NodeTest - Response from main');
	});

	// Node Test
	const testNode = () => {
		api.send('nodeTest', 'Testing');
	};

	// Show Dialog - Naive Open file
	const fileOpen = async () => {
		const thePath = await window.api.openNativeFile();
		console.log(thePath);
		setFilePath(thePath);
	};
	// send data to Main
	const sendCountState = () => {
		api.send('countData', count);
	};

	// redux test

	window.api.onUpdateCounter(async (e, value) => {
		const oldValue = count;
		const newValue = oldValue + value;
		console.log(`OLD VALUE:  ${oldValue}`);
		console.log(`Passed VALUE:  ${value}`);
		console.log(`New VALUE:  ${newValue}`);
		setCount(newValue);

		// send reply back to main
		await e.sender.send('counter-value', count);
	});

	return (
		<section>
			<NativeOpen fileOpen={fileOpen} filePath={filePath} />
			<NodeTest testNode={testNode} />
			<Counter count={count} sendCountState={sendCountState} />
		</section>
	);
}

export default App;
