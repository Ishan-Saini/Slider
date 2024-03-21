import React, { useState } from 'react'
import Slider from './Slider'
import classes from './Slider.module.css';

const alignmentDecorator = story => (
  <div className={classes.center}>{story()}</div>
)

export default {
  title: 'Components/Slider',
  component: Slider,
  decorators: [alignmentDecorator],
}

export const Continuous = () => {
  const [value, setValue] = useState(50)

  return (
    <div style={{ width: '480px' }}>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export const Discrete = () => {
  const [value, setValue] = useState(50)

  return (
    <div style={{ width: '480px' }}>
      <Slider
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export const Range = () => {
  const [value, setValue] = useState([40, 65])

  return (
    <div style={{ width: '480px' }}>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={newValue => setValue(newValue)}
      />
    </div>
  )
}
