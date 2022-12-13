// check for Node version
const { spawn } = require('node:child_process');
const { checkFiles } = require('./checkDummyFile');

const regexNode = /v16\.17\.0/;

let result = null;

exports.checkNode = () => {};
let child = spawn('node', ['-v']);

child.stdout.on('data', data => {
	console.log(`stdout: ${data}`);

	if (data.toString().match(regexNode)) {
		// Run next process to find file process
		// default is dummyfile
		result = checkFiles();
		console.log('result: ', result);
		return result;
	}
});

child.stderr.on('data', data => {
	console.error(`stderr: ${data}`);
});

child.on('close', code => {
	console.log(`Main Child process exited with code ${code}`);
	return code;
});

// exports.checkFiles = (fileName = 'dummyfile') => {
// 	let child = spawn('find', ['/V /C /I', fileName]);

// 	child.stdout.on('data', data => {
// 		console.log(`stdout: ${data}`);
// 	});

// 	child.stderr.on('data', data => {
// 		console.error(`stderr: ${data}`);
// 	});

// 	child.on('close', code => {
// 		switch (code) {
// 			case 1:
// 				console.log(`File code ${code}: Searched file not found`);
// 				break;
// 			case 2:
// 				console.log(
// 					`File code ${code}: Searched file not found or invalid command given... most likely invalid command`
// 				);
// 				break;

// 			default:
// 				console.log('Found file');
// 				break;
// 		}
// 	});
// };
