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

	// Get message according to data
	const getMessage = async data => {
		switch (data) {
			case 1:
				new Notification('Alert #1', {
					body: 'Data # 1 --> Message 1',
				});

				break;
			case 2:
				new Notification('Alert #2', {
					body: 'Data # 2 --> Message 2',
				});
				break;
			case 3:
				new Notification('Alert #3', {
					body: 'Data # 3 --> Message 3',
				});
				break;
			case 4:
				new Notification('Alert #4', {
					body: 'Data # 4 --> Message 4',
				});
				break;

			default:
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
