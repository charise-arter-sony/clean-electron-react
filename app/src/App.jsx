import React, { useState } from 'react';
import AlertTest from './components/AlertTest';
import NativeOpen from './components/NativeOpen';

function App() {
	const [filePath, setFilePath] = useState([]);
	const [data, setData] = useState();
	const [fileData, setFileData] = useState();
	const [message, setMessage] = useState('');
	const [fileMessage, setFileMessage] = useState('');
	const [isShown, setIsShown] = useState(false);

	const handleClick = async () => {
		setIsShown(current => !current);
		const theData = await window.api.checkNodeV();
		// const findFile = await window.api.checkFile();
		console.log('The Data: ', theData);
		// console.log('The File Data: ', findFile);
		setData(theData);
		// setFileData(findFile);
		getMessage(theData);
		// getFileMsg(findFile);
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

	// Get message according to data
	const getMessage = data => {
		switch (data) {
			case 0:
				setMessage('Dependency found'), (<AlertTest message={message} />);

				break;
			case 1:
				setMessage('Dependency Not Found'), (<AlertTest message={message} />);
				break;
			case 1:
				setMessage('Invalid Command'), (<AlertTest message={message} />);
				break;

			default:
				break;
		}
	};
	// Get message according to file data
	// const getFileMsg = fileData => {
	// 	switch (fileData) {
	// 		case 0:
	// 			setFileMessage('File found'), (<AlertTest message={fileMessage} />);

	// 			break;
	// 		case 1:
	// 			setFileMessage('File Not Found'), (<AlertTest message={fileMessage} />);
	// 			break;

	// 		default:
	// 			break;
	// 	}
	// };

	return (
		<section>
			<NativeOpen fileOpen={fileOpen} filePath={filePath} />
			<button onClick={handleClick}>Start Fake Process</button>
			{isShown && (
				<AlertTest message={message} data={data} handleClose={handleClose} />
			)}
			{/* {isShown && (
				<AlertTest
					message={message}
					data={fileData}
					handleClose={handleClose}
				/>
			)} */}
		</section>
	);
}

export default App;
