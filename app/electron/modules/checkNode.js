exports.getNodeVersion = async () => {
	const regexNode = /v16\.17\.0/;

	const util = require('node:util');
	const execFile = util.promisify(require('node:child_process').execFile);

	const { stdout } = await execFile('node', ['-v']);
	console.log('Output of Node version: ', stdout);

	if (stdout.toString().match(regexNode)) {
		console.log(`It's a match! Success Code: `, 0);

		return 0;
	} else {
		console.log(` Error: `, -1);
		return -1;
	}
};
