import React, { useState } from 'react';
import NativeOpen from './components/NativeOpen';
import NodeTest from './components/NodeTest';
import Counter from './components/Counter';

function App() {
	const [filePath, setFilePath] = useState([]);
	const [count, setCount] = useState(0);

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

	return (
		<section>
			<NativeOpen fileOpen={fileOpen} filePath={filePath} />
			<NodeTest testNode={testNode} />
			<Counter count={count} />
		</section>
	);
}

export default App;
