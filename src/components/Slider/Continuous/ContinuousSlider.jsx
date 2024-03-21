import { useEffect, useRef } from 'react';
import Tooltip from '../Tooltip.jsx';
import classes from './ContinuousSlider.module.css';

const ContinuousSlider = ({
  value,
  uom,
  size,
  status,
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

  const handleProperties = {
    "--size": size,
    "--box-shadow": status === "focus" ? "0px 0px 0px 2px #47B647" : "0px 1px 4px 0px #0000003D",
    "--border": status === "hover" ? "#EDFAED solid 6px" : "#ffffff solid 6px"
  }

  return (
    <>
      <input
        ref={sliderRef}
        type='range'
        className={classes.continuousSlider}
        value={value}
        onChange={onChange}
        {...props}
        onMouseOver={() => tooltipRef.current.style.display = 'flex'}
        onMouseOut={() => tooltipRef.current.style.display = 'none'}
        style={handleProperties}
      />
      <Tooltip tooltipRef={tooltipRef} text={value} uom={uom} />
    </>
  )
}

export default ContinuousSlider;