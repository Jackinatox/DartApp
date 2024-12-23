import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DartCounter from "./components/dart/DartCounterChatGPT";
import Darti from "./components/dart/DartClaud";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
    <Darti />
  </div>	  
  )
}

export default App
