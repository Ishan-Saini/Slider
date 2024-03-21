import { useState } from 'react'
import './App.css'
import Slider from './components/Slider/Slider.jsx'

function App() {
  const [value, setValue] = useState(50)
  return (
    <div style={{ width: '480px' }} className='center'>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export default App
