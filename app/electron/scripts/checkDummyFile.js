const { spawn } = require('node:child_process');

exports.checkFiles = (fileName = 'dummyfile') => {
	let child = spawn('find', ['/V /C /I', fileName]);

	child.stdout.on('data', data => {
		console.log(`stdout: ${data}`);
		return data;
	});

	child.stderr.on('data', data => {
		console.error(`stderr: ${data}`);
		return data;
	});

	child.on('close', code => {
		console.log(`Close code for dummy file is ${code}`);
		return code;
	});
};
