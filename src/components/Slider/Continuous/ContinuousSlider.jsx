import { useEffect, useRef } from 'react';
import Tooltip from '../Tooltip.jsx';
import classes from './ContinuousSlider.module.css';

const ContinuousSlider = ({
  value,
  uom,
  onChange,
  getSlidedValueFraction,
  ...props
}) => {

  const sliderRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if(!sliderRef.current) return
    const valuePercentage = getSlidedValueFraction(value) * 100;
    const gradientBg = `linear-gradient(90deg, #47B647 ${valuePercentage}%, #F2F3F5 ${valuePercentage}%)`;
    sliderRef.current.style.background = gradientBg;
  }, [value, getSlidedValueFraction])

  useEffect(() => {
    if(!tooltipRef.current) return
    tooltipRef.current.style.left = `${getSlidedValueFraction(value) * 100}%`;
  }, [value, getSlidedValueFraction])

  return (
    <>
      <input
        ref={sliderRef}
        type='range'
        className={classes.continuousSlider}
        value={value}
        onChange={onChange}
        {...props}
      />
      <Tooltip tooltipRef={tooltipRef} text={value} uom={uom} />
    </>
  )
}

export default ContinuousSlider;