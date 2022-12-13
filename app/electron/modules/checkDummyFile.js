exports.getDummyFile = (filename = 'dummyfile') => {
	const { spawn } = require('node:child_process');

	const child = spawn('find', ['/V /C /I', filename]);

	child.stdout.on('data', data => {
		console.log(`stdout: ${data}`);
	});

	child.stderr.on('data', data => {
		console.error(`stderr: ${data}`);
	});

	child.on('close', code => {
		switch (code) {
			case 1:
				console.log(`File code ${code}: Searched file not found`);
				break;
			case 2:
				console.log(
					`File code ${code}: Searched file not found or invalid command given... most likely invalid command`
				);
				break;

			default:
				console.log('Found file');
				break;
		}
	});
};
