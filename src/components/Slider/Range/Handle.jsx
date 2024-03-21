import { useRef, useEffect } from "react";
import Tooltip from "../Tooltip";
import classes from './RangeSlider.module.css'

const Handle = ({
  value,
  uom,
  size,
  identifier,
  position,
  getSlidedValue,
  ...props
}) => {
  const tooltipRef = useRef()

  useEffect(() => {
    if (!tooltipRef.current) return
    tooltipRef.current.style.left = `${getSlidedValue(value)}%`
  }, [position, getSlidedValue, value])

  const handleProperties = {
    "--size": size,
  }

  return (
    <>
      <input
        type='range'
        className={classes.handle}
        value={value}
        name={identifier}
        {...props}
        onMouseOver={() => tooltipRef.current.style.display = 'flex'}
        onMouseOut={() => tooltipRef.current.style.display = 'none'}
        style={handleProperties}
      />
      <Tooltip tooltipRef={tooltipRef} text={value} uom={uom} />
    </>
  )
}

export default Handle;