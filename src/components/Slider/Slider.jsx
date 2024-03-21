import React, {useCallback} from 'react';
import classes from './Slider.module.css';
import ContinuousSlider from './Continuous/ContinuousSlider.jsx';

const Slider = ({
  value,
  uom = '%',
  min,
  max,
  onChange,

}) => {
  const isRangeSlider = Array.isArray(value);
  const getSlidedValueFraction = useCallback(
    val => (val - min) / (max - min),
    [min, max]
  )

  return (
    <div className={classes.container}>
      <div className={classes.valueContainer}>
        {
          !isRangeSlider &&
          <ContinuousSlider
            value={value}
            uom={uom}
            onChange={onChange}
            getSlidedValueFraction={getSlidedValueFraction}
          />
        }
      </div>
    </div>
  )
}

export default Slider;