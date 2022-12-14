exports.getNodeVersion = async () => {
	const regexNode = /v16\.17\.0/;

	const util = require('node:util');
	const execFile = util.promisify(require('node:child_process').execFile);

	const { stdout } = await execFile('node', ['--version']);
	console.log(stdout);

	if (stdout.toString().match(regexNode)) {
		console.log(`Match!`);
		console.log(`Success: `, 0);

		return 0;
	} else {
		console.log(` Error: `, -1);
		return -1;
	}
};
