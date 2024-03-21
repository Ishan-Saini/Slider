import { useRef, useEffect } from "react";
import Tooltip from "../Tooltip";
import classes from './RangeSlider.module.css'

const Handle = ({
  value,
  uom,
  size,
  status,
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
    "--box-shadow": status === "focus" ? "0px 0px 0px 2px #47B647" : "0px 1px 4px 0px #0000003D",
    "--border": status === "hover" ? "#EDFAED solid 6px" : "#ffffff solid 6px"
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