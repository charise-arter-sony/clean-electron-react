import React from 'react';

function AlertTest({ message, handleClose }) {
	return (
		<div>
			<hr />
			<h2>Alert Test</h2>

			<p>Notification will appear when button is pressed.</p>
			<p>{message}</p>
			<button onClick={handleClose}>Close Alert</button>
		</div>
	);
}

export default AlertTest;
