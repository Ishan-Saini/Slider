import classes from './Slider.module.css';

const Tooltip = ({ tooltipRef, text, uom }) => {
    return (
        <div ref={tooltipRef} className={classes.tooltip}>
            {text}{uom}
        </div>
    )
}

export default Tooltip;