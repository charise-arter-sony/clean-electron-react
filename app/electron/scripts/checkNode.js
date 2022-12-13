// check for Node version
const { spawn } = require('node:child_process');
const { checkFiles, fileCode } = require('./checkDummyFile');

const regexNode = /v16\.17\.0/;

exports.checkNode = () => {
  let nodeCheck = spawn('node', [-v]);
  let dummyCheckCode = checkFiles()

  nodeCheck.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
	if (data.toString().match(regexNode)) {
		// Run next process to find file process
		// default is dummyfile
		console.log(`User has Node ${data}`);
  })
};

child.stdout.on('data', data => {
	console.log(`stdout: ${data}`);
	if (data.toString().match(regexNode)) {
		// Run next process to find file process
		// default is dummyfile
		console.log(`User has Node ${data}`);
		fileCode = checkFiles();
	}
});

child.stderr.on('data', data => {
	console.error(`stderr: ${data}`);
});

child.on('close', code => {
	console.log(`Main Child process exited with code ${code}`);
	ipcMain.handle('alert:data', code);
	return code;
});
