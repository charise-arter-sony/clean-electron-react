import React, { useState } from 'react';
import AlertTest from './components/AlertTest';
import NativeOpen from './components/NativeOpen';
import NodeTest from './components/NodeTest';

function App() {
	const [filePath, setFilePath] = useState([]);
	const [data, setData] = useState();
	const [message, setMessage] = useState('');

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

	// Get data
	const getData = async () => {
		const theData = await window.api.onSendToRenderer('alert:data', data);
		console.log(theData);
		setData(theData);
		getMessage(theData);
	};

	const getMessage = async data => {
		switch (data) {
			case 1:
				setMessage('Data # 1 --> Message 1');
				break;
			case 2:
				setMessage('Data # 2 --> Message 2');
				break;
			case 3:
				setMessage('Data # 3 --> Message 3');
				break;
			case 4:
				setMessage('Data # 4 --> Message 4');
				break;

			default:
				setMessage(' Error: No data was received');
				break;
		}
	};

	return (
		<section>
			<NativeOpen fileOpen={fileOpen} filePath={filePath} />
			<NodeTest testNode={testNode} />
			<AlertTest
				getData={getData}
				data={data}
				getMessage={getMessage}
				message={message}
			/>
		</section>
	);
}

export default App;
