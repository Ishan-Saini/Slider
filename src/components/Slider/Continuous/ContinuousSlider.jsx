import classes from './ContinuousSlider.module.css'

const ContinuousSlider = () => {
  return (
    <>
      <input 
        type='range'
        className={classes.continuousSlider}
      />
    </>
  )
}

export default ContinuousSlider;