import React, { useState } from 'react';
import AlertTest from './components/AlertTest';
import NativeOpen from './components/NativeOpen';
import NodeTest from './components/NodeTest';

function App() {
	const [filePath, setFilePath] = useState([]);
	const [data, setData] = useState();
	const [message, setMessage] = useState('');
	const [isShown, setIsShown] = useState(false);

	// Message response Test
	window.api.receive('test-succeeded', () => {
		console.log('NodeTest - Response from main');
	});

	// Node Test
	const testNode = () => {
		api.send('nodeTest', 'Testing');
	};

	const handleClick = async () => {
		setIsShown(current => !current);
		const theData = await window.api.onSendToRenderer('alert:data', data);
		console.log(theData);
		setData(theData);
		getMessage(theData);
	};

	const handleClose = () => {
		setIsShown(current => !current);
	};

	// Show Dialog - Naive Open file
	const fileOpen = async () => {
		const thePath = await window.api.openNativeFile();
		console.log(thePath);
		setFilePath(thePath);
	};

	// Get data
	// const getData = async () => {
	// 	const theData = await window.api.onSendToRenderer('alert:data', data);
	// 	console.log(theData);
	// 	setData(theData);
	// 	getMessage(theData);
	// };

	// Get message according to data
	const getMessage = async data => {
		switch (data) {
			case 1:
				// new Notification('Alert #1', {
				// 	body: 'Data # 1 --> Message 1',
				// });
				setMessage('Data for Alert component 1'),
					(<AlertTest message={message} />);

				break;
			case 2:
				// new Notification('Alert #2', {
				// 	body: 'Data # 2 --> Message 2',
				// });
				setMessage('Data for Alert component 2'),
					(<AlertTest message={message} />);
				break;
			case 3:
				// new Notification('Alert #3', {
				// 	body: 'Data # 3 --> Message 3',
				// });
				setMessage('Data for Alert component 3'),
					(<AlertTest message={message} />);
				break;
			case 4:
				// new Notification('Alert #4', {
				// 	body: 'Data # 4 --> Message 4',
				// });
				setMessage('Data for Alert component 4'),
					(<AlertTest message={message} />);
				break;

			default:
				break;
		}
	};

	return (
		<section>
			<NativeOpen fileOpen={fileOpen} filePath={filePath} />
			<NodeTest testNode={testNode} />
			<button onClick={handleClick}>Start Fake Process</button>
			{isShown && (
				<AlertTest message={message} data={data} handleClose={handleClose} />
			)}
		</section>
	);
}

export default App;
