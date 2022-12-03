import React from 'react';

function AlertTest({ getData }) {
	return (
		<div>
			<hr />
			<h2>Alert Test</h2>
			<button onClick={getData}>Start Fake Process</button>
			<p>
				Notification will appear when button is pressed. Close to see other
				notifications.
			</p>
		</div>
	);
}

export default AlertTest;
