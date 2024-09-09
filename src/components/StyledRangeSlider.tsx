import "../context/rangeSliderStyles.css"
import {Themes} from "../context/Themes";
import {StyledLabel} from "./StyledLabel";

export const StyledRangeSlider = (props) => {

    const handleChangeMinValue = (event) => {
        const newValue: number = parseInt(event.target.value)

        if (newValue + props.difference <= props.maxValue && newValue >= props.min) props.setMinValue(newValue)
    }

    const handleChangeMaxValue = (event) => {
        const newValue: number = parseInt(event.target.value)

        if (newValue - props.difference >= props.minValue && newValue <= props.max) props.setMaxValue(newValue)
    }

    const width = props.max - props.min
    const startPercent = 100.0 * (props.minValue - props.min) / width
    const endPercent = 100.0 * (props.maxValue - props.min) / width

    return (
        <>
            <div style={{height: "1em"}}/>
            <StyledLabel color={Themes.black} label={props.label} />
            <div className="container styled-range-display">
                <div className="styled-range-display-center rounded-3" style={{backgroundColor: Themes.darkGreen}}>{`${props.minValue} - ${props.maxValue}`}</div>
                <div className="styled-range-display-carrot" style={{borderTop: `.5em solid ${Themes.darkGreen}`}} />
            </div>
            <div style={{position: "relative"}}>
                <div className="styled-range-slider-track" style={{
                    background: `linear-gradient(to right, ${Themes.accentGrey} ${startPercent}%, #62E9A5 ${startPercent}%, #62E9A5 ${endPercent}%, ${Themes.accentGrey} ${endPercent}%)`
                }}/>
                <input className="styled-range-slider" type="range" min={props.min} max={props.max} step={props.step} value={props.minValue} onChange={handleChangeMinValue} />
                <input className="styled-range-slider" type="range" min={props.min} max={props.max} step={props.step} value={props.maxValue} onChange={handleChangeMaxValue} />
            </div>
            <hr />
        </>
    )
}