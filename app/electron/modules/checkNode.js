exports.getNodeVersion = () => {
	const { spawn } = require('node:child_process');

	const regexNode = /v16\.17\.0/;

	const child = spawn('node', ['-v']);

	child.stdout.on('data', data => {
		console.log(`stdout: ${data}`);
		if (data.toString().match(regexNode)) {
			console.log(`stdout: ${data}`);
			parent.webContents.send(data)
			return 0;
		}
		return 1;
	});

	child.stderr.on('data', data => {
		console.error(`stderr: ${data}`);
		return data;
	});

	child.on('close', code => {
		console.log(`Main Child process exited with code ${code}`);
	});
};
