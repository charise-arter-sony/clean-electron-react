exports.getNodeVersion = async (window) => {
	const regexNode = /v16\.17\.0/;

	const util = require('node:util');
	const execFile = util.promisify(require('node:child_process').execFile);

	const { stdout } = await execFile('node', ['-v'], ['utf8']);
	console.log('Output of Node version: ', stdout);
	let result = '';
	let msg = '';
	if (stdout.toString().match(regexNode)) {
		msg = 5;

		return msg;
		// console.log('Node found!');
		// result = 'found!';
		// // msg = resultPromise.then((result) => {
		// // 	console.log(`Result from getNode function: ${result}`);
		// // });
		// console.log(`Success Msg from getNode fn: ${msg}`);

		// return msg;
	} else {
		console.log('Node not found');

		msg = 'Nope';
		// msg = resultPromise.then((result) => {
		// 	console.log(`Result from getNode function: ${result}`);
		// });

		// console.log(`Failure Msg from getNode fn: ${msg}`);
		// window.webContents.send('alert:node', msg);

		return msg;
	}
};
