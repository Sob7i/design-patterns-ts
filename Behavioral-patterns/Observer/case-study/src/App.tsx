import {useCounter} from './state'

const Counter = () => {
  const [count, setCount] = useCounter()
  const handleClick = (e: any) => setCount(count + 1)

  return (
    <div>
      <button onClick={handleClick} type="button">
        {' '}
        Add{' '}
      </button>
      <h2>Count: {count}</h2>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Counter />
      <Counter />
      <Counter />
    </div>
  )
}

export default App
