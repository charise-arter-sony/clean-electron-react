import React from 'react'

function Counter({ count }) {
  return (
    <section>
      <h2>Counter</h2>

      <h3 id="counterValue">{count}</h3>
      <button id="btnIncrement"> Increment +</button>
      <button id="btnDecrement"> Decrement -</button>

    </section>
  )
}

export default Counter