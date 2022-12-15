// edit this to be a switch case based on platform of system
// different systems have different ways of finding files
// use same format as checkNode file

exports.getDummyFile = (filename = 'dummyfile') => {
	const { exec } = require('node:child_process');
	exec('dir ' + filename + '* /s', (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return 1;
		} else {
			try {
				console.log(`stdout: ${stdout}`);
				let output = stdout.toString();
				console.log(`Output found: ${output}`);
			} catch (error) {
				console.error(`stderr: ${stderr}`);
				console.log(`There was an error: ${error}`);
			}
		}
	});
};
