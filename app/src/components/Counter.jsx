import React from 'react';

function Counter({ count, sendCountState }) {
	return (
		<section>
			<h2>Counter - Main to Renderer</h2>
			<p> Main does logic, while Renderer has state</p>

			<h3 id='counterValue'>{count}</h3>
			<button onClick={sendCountState}>Send Main count state</button>
		</section>
	);
}

export default Counter;
