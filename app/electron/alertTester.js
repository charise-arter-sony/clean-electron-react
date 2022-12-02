let fakeData = [1, 2, 3, 4];
export let data = 0;
export let message = '';

function randomData(fakeData) {
	data = fakeData[Math.floor(Math.random() * fakeData.length)];
	console.log(`Data is: ${data}`);
	return data;
}

randomData(fakeData);

export function getMessage(data) {
	switch (data) {
		case 1:
			return (message = `Data received was ${data}: Message A sent`);

			break;
		case 2:
			return (message = `Data received was ${data}: Message B sent`);
			break;
		case 3:
			return (message = `Data received was ${data}: Message C sent`);
			break;
		case 4:
			return (message = `Data received was ${data}: Message D sent`);
			break;

		default:
			break;
	}
}

getMessage(data);

console.log(`Result --> ${message}`);
module.exports = {
	getMessage,
	message,
	data,
};
