import React, {useCallback} from 'react';
import propTypes from 'prop-types'
import classes from './Slider.module.css';
import ContinuousSlider from './Continuous/ContinuousSlider.jsx';
import RangeSlider from './Range/RangeSlider.jsx';

const Slider = ({
  value,
  uom = '%',
  min,
  max,
  step,
  onChange,
  type,
  size = '24px',
  status,
}) => {
  const isRangeSlider = Array.isArray(value);
  const getSlidedValueFraction = useCallback(
    val => (Number(val) - min) / (max - min),
    [min, max]
  )

  const getSlidedValue = useCallback(
    percentage => (percentage * (max - min)) / 100 + min,
    [min, max],
  )

  return (
    <div className={classes.container}>
      <div className={classes.valueContainer}>
        {
          (type === 'continuous' || type === 'discrete') &&
          <ContinuousSlider
            min={min}
            max={max}
            value={value}
            uom={uom}
            size={size}
            status={status}
            step={step}
            onChange={onChange}
            getSlidedValueFraction={getSlidedValueFraction}
          />
        }
        {
          type === 'range' &&
          <RangeSlider
            min={min}
            max={max}
            values={value}
            uom={uom}
            size={size}
            status={status}
            step={step}
            onChange={onChange}
            getSlidedValueFraction={getSlidedValueFraction}
            getSlidedValue={getSlidedValue}
          />
        }
      </div>
    </div>
  )
}

Slider.defaultProps = {
  min: 0,
  max: 100,
  onChange: () => {},
  step: 1,
  uom: '%',
  status: 'default',
  size: '24px'
}

Slider.propTypes = {
  min: propTypes.number,
  max: propTypes.number,
  value: propTypes.oneOfType([
    propTypes.number,
    propTypes.arrayOf(propTypes.number),
  ]),
  onChange: propTypes.func,
  step: propTypes.number,
  uom: propTypes.string,
}

export default Slider;