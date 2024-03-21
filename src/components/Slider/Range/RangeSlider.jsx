import { useRef, useCallback, useState, useEffect } from "react";
import Handle from "./Handle";
import classes from './RangeSlider.module.css';

const thumbsMap = {
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

  const [handleThumbsMap, setHandleThumbsMap] = useState(handleDefaultValues())
  const [activeThumb, setActiveThumb] = useState(thumbsMap[0])

  useEffect(() => {
    if (!handleThumbsMap) return
    const currentValues = [
      handleThumbsMap[thumbsMap[0]].value,
      handleThumbsMap[thumbsMap[1]].value,
    ]
    if ((currentValues[0] != values[0]) || (currentValues[1] != values[1])) {
      const [lowerValue, upperValue] = values
      setHandleThumbsMap(prevValues =>
        prevValues.map(({ identifier, value, position }) => {
          const newValue = identifier === thumbsMap[0] ? lowerValue : upperValue
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
  }, [values, handleThumbsMap, getSlidedValueFraction, handleDefaultValues])

  useEffect(() => {
    if (!barRef.current) return
    const lowerPos = handleThumbsMap[thumbsMap[0]].position
    const upperPos = handleThumbsMap[thumbsMap[1]].position

    const bg = `linear-gradient(90deg, #F2F3F5 0,
      #F2F3F5 ${lowerPos}%, #47B647 ${lowerPos}%,
      #47B647 ${upperPos}%, #F2F3F5 ${upperPos}%,
      #F2F3F5 100%)`
    barRef.current.style.background = bg
  }, [handleThumbsMap, getSlidedValueFraction])

  const updateValue = (keyIndex, value, pos) => {
    if (value < min || value > max) return
    let currentThumbsMap = [...handleThumbsMap]
    currentThumbsMap[keyIndex] = {
      ...currentThumbsMap[keyIndex],
      value,
      position: pos ?? getSlidedValueFraction(value) * 100,
    }

    if (
      currentThumbsMap[thumbsMap[0]].value >
      currentThumbsMap[thumbsMap[1]].value
    ) {
      const temp = thumbsMap[0]
      thumbsMap[0] = thumbsMap[1]
      thumbsMap[1] = temp
    }

    setHandleThumbsMap(currentThumbsMap)
    onChange(currentThumbsMap.map(({ value }) => value).sort((a, b) => a - b))
  }

  const handleChange = ({ target }) => {
    const { name: keyIndex, value } = target
    setActiveThumb(keyIndex)
    const currentValue = Number(value)
    updateValue(keyIndex, currentValue)
  }

  const handleBarClick = e => {
    const mouseX = Number(e.nativeEvent.offsetX)
    const currentPos = (mouseX / e.target.clientWidth) * 100
    const distanceFromLowerThumb = Math.abs(
      handleThumbsMap[thumbsMap[0]].position - currentPos,
    )
    const distanceFromUpperThumb = Math.abs(
      handleThumbsMap[thumbsMap[1]].position - currentPos,
    )

    const curVal = Number(getSlidedValue(currentPos))

    if (distanceFromLowerThumb <= distanceFromUpperThumb) {
      setActiveThumb(thumbsMap[0])
      const { keyName } = handleThumbsMap[thumbsMap[0]]
      updateValue(keyName, curVal, currentPos)
    } else {
      setActiveThumb(thumbsMap[1])
      const { keyName } = handleThumbsMap[thumbsMap[1]]
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
      {handleThumbsMap.map(handleProps => (
        <Handle
          identifier={handleProps.identifier}
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