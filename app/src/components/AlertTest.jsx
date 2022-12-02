import React from 'react';

function AlertTest({ getData, message }) {
	return (
		<div>
			<hr />
			<h2>Alert Test</h2>
			<button onClick={getData}>Start Fake Process</button>
			<p>
				Message received (depending on data): <strong>{message}</strong>
			</p>
		</div>
	);
}

export default AlertTest;
