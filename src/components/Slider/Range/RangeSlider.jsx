import { useRef, useCallback, useState, useEffect } from "react";
import Handle from "./Handle";
import classes from './RangeSlider.module.css';

const handleRangeMap = {
  0: 0,
  1: 1,
}

const RangeSlider = ({
  min,
  max,
  step,
  values,
  onChange,
  getSlidedValueFraction,
  getSlidedValue,
  ...props
}) => {
  const barRef = useRef()
  const handleDefaultValues = useCallback(
    () =>
      values.map((value, index) => ({
        identifier: index,
        value,
        position: getSlidedValueFraction(value) * 100,
      })),
    [values, getSlidedValueFraction],
  )

  const [handleMap, setHandleMap] = useState(handleDefaultValues())
  const [activeHandle, setActiveHandle] = useState(handleRangeMap[0])

  useEffect(() => {
    if (!handleMap) return
    const currentValues = [
      handleMap[handleRangeMap[0]].value,
      handleMap[handleRangeMap[1]].value,
    ]
    if ((currentValues[0] != values[0]) || (currentValues[1] != values[1])) {
      const [lowerValue, upperValue] = values
      setHandleMap(prevValues =>
        prevValues.map(({ identifier, value, position }) => {
          const newValue = identifier === handleRangeMap[0] ? lowerValue : upperValue
          if (value === newValue) {
            return { identifier, value, position }
          }
          return {
            identifier,
            value: newValue,
            position: getSlidedValueFraction(newValue) * 100,
          }
        }),
      )
    }
  }, [values, handleMap, getSlidedValueFraction, handleDefaultValues])

  useEffect(() => {
    if (!barRef.current) return
    const lowerPos = handleMap[handleRangeMap[0]].position
    const upperPos = handleMap[handleRangeMap[1]].position

    const bg = `linear-gradient(90deg, #F2F3F5 0,
      #F2F3F5 ${lowerPos}%, #47B647 ${lowerPos}%,
      #47B647 ${upperPos}%, #F2F3F5 ${upperPos}%,
      #F2F3F5 100%)`
    barRef.current.style.background = bg
  }, [handleMap, getSlidedValueFraction])

  const updateValue = (keyIndex, value, pos) => {
    if (value < min || value > max) return
    let currentHandleRangeMap = [...handleMap]
    currentHandleRangeMap[keyIndex] = {
      ...currentHandleRangeMap[keyIndex],
      value,
      position: pos ?? getSlidedValueFraction(value) * 100,
    }

    if (
      currentHandleRangeMap[handleRangeMap[0]].value >
      currentHandleRangeMap[handleRangeMap[1]].value
    ) {
      const temp = handleRangeMap[0]
      handleRangeMap[0] = handleRangeMap[1]
      handleRangeMap[1] = temp
    }

    setHandleMap(currentHandleRangeMap)
    onChange(currentHandleRangeMap.map(({ value }) => value).sort((a, b) => a - b))
  }

  const handleChange = ({ target }) => {
    const { name: keyIndex, value } = target
    setActiveHandle(keyIndex)
    const currentValue = Number(value)
    updateValue(keyIndex, currentValue)
  }

  const handleBarClick = e => {
    const mouseX = Number(e.nativeEvent.offsetX)
    const currentPos = (mouseX / e.target.clientWidth) * 100
    const distLowerHandle = Math.abs(
      handleMap[handleRangeMap[0]].position - currentPos,
    )
    const distUpperHandle = Math.abs(
      handleMap[handleRangeMap[1]].position - currentPos,
    )

    const curVal = Number(getSlidedValue(currentPos))

    if (distLowerHandle <= distUpperHandle) {
      setActiveHandle(handleRangeMap[0])
      const { keyName } = handleMap[handleRangeMap[0]]
      updateValue(keyName, curVal, currentPos)
    } else {
      setActiveHandle(handleRangeMap[1])
      const { keyName } = handleMap[handleRangeMap[1]]
      updateValue(keyName, curVal, currentPos)
    }
  }

  return (
    <>
      <div
        className={classes.rangeSlider}
        ref={barRef}
        onClick={handleBarClick}
      />
      {handleMap.map(handleProps => (
        <Handle
          key={handleProps.identifier}
          {...handleProps}
          {...props}
          step={step}
          onChange={handleChange}
          getSlidedValue={getSlidedValue}
          min={min}
          max={max}
        />
      ))}
    </>
  )
}

export default RangeSlider;