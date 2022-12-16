// edit this to be a switch case based on platform of system
// different systems have different ways of finding files
// use same format as checkNode file

const getDummyFile = () => {
	const { exec } = require('node:child_process');
	let filename = 'dummyFile';
	const notFound = 'File Not Found';
	exec(' dir ' + filename + '.* /s', (error, stdout, stderr) => {
		if (error) {
			let resultError = error.toString();

			if (resultError.includes(notFound)) {
				console.log(`\n ${filename} not found`);
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
		}
	});
};

getDummyFile();
