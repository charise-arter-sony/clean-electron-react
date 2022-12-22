exports.getNodeVersion = async () => {
	const regexNode = /v16\.17\.0/;

	const util = require('node:util');
	const execFile = util.promisify(require('node:child_process').execFile);

	const { stdout } = await execFile('node', ['-v']);
	console.log('Output of Node version: ', stdout);

	if (stdout.toString().match(regexNode)) {
		console.log('Node found!');
		//await window.webContents.send('Node found!!!');
		return 'Correct Node version found!';
		// return 'Correct Node version found!';
	} else {
		console.log('Node not found');
		//await window.webContents.send('Not found. Install Node!');
		return 'Node not found! Install node';
	}
};
