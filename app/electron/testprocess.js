const { spawn } = require('child_process');

exports.tester = () => {
	const child = spawn('cmd . ./ffmpeg.exe -codecs |& grep hevc', {
		stdio: 'inherit',
		shell: true,
	});

	child.stdout.on('data', data => {
		console.log(`child stdout:\n${data}`);
	});

	child.stderr.on('data', data => {
		console.error(`child stderr:\n${data}`);
	});
};
