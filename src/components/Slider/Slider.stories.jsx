import React, { useState } from 'react'
import Slider from './Slider'
import classes from './Slider.module.css';

const alignmentDecorator = story => (
  <div className={classes.center}>{story()}</div>
)

export default {
  title: 'Components',
  component: Slider,
  decorators: [alignmentDecorator],
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['continuous', 'discrete', 'range']
    },
    size: {
      control: 'inline-radio',
      options: ['24px', '32px']
    },
    status: {
      control: 'inline-radio',
      options: ['default', 'hover', 'focus']
    }
  }
}

const Template = args => {
  const [value, setValue] = useState(args.value);
  const [type, setType] = useState('continuous')

  const handleChange = el => {
    if (args.type === 'range') {
      setValue(el)
    }
    else {
      setValue(el.target.value);
      if (args.onChange) {
        args.onChange(el);
      }
    }
  };
  
  if(args.type != type)
  {
    setType(args.type)
    if (args.type !== 'range') {
      setValue(50);
    }
    else {
      setValue([30,70]);
    }
  }

  if (args.type !== 'discrete') args.step = null;

  return (
    <div style={{ width: '480px' }}>
      <Slider {...args} value={value} onChange={handleChange} />
    </div>
  );
};

export const ReactSlider = Template.bind({})
  ReactSlider.args = {
    min: 0,
    max: 100,
    value: 50,
    step: 5
}
