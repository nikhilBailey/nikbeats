import {Form} from "react-bootstrap"
import {StyledRangeSlider} from "./StyledRangeSlider"
import {AdvancedSettings} from "./AdvancedSettings"
import {StyledInputGroup} from "./StyledInputGroup"
import {createPlaylistConfig, PlaylistConfig} from "../PlaylistGenerator/Playlist";

export const GeneratorForm = (props) => {

    const handleHoursChange = (event) => {
        let newValue = parseInt(event.target.value)

        if (isNaN(newValue) || newValue <= 0) newValue = 0
        else if (newValue >= 24) newValue = 23

        const newTargetTime = newValue * 3600 + props.playlistConfig.targetTime % 3600

        props.setPlaylistConfig(prev => {return createPlaylistConfig({...prev, targetTime: newTargetTime})})
    }
    const handleMinutesChange = (event) => {
        let newValue = parseInt(event.target.value)

        if (isNaN(newValue) || newValue <= 0) newValue = 0
        else if (newValue >= 60) newValue = 59

        const newTargetTime = parseInt("" + (newValue * 60 + Math.floor(props.playlistConfig.targetTime / 3600) * 3600))

        props.setPlaylistConfig(prev => {return createPlaylistConfig({...prev, targetTime: newTargetTime})})
    }


    return (
        <Form style={{display: "flex", flexWrap: "wrap", gap: "3em"}}>
            <div style={{width: "10rem"}}>
                <Form.Label>Settings</Form.Label>
                <hr />
                <Form.Label>Time</Form.Label>
                <StyledInputGroup
                    value={parseInt("" + Math.floor(props.playlistConfig.targetTime / 3600))}
                    onChange={handleHoursChange}
                    label="hours"
                />
                <StyledInputGroup
                    value={(props.playlistConfig.targetTime % 3600) / 60}
                    onChange={handleMinutesChange}
                    label="minutes"
                />
                <hr />
                <AdvancedSettings {...props} />
            </div>
            <div style={{width: "10rem"}}>
                <Form.Label>Options</Form.Label>
                <hr />
                <StyledRangeSlider
                    maxValue={props.playlistConfig.familyRatingMax}
                    minValue={props.playlistConfig.familyRatingMin}
                    setMaxValue={(value) => props.setPlaylistConfig(prev => createPlaylistConfig({...prev, familyRatingMax: value}))}
                    setMinValue={(value) => props.setPlaylistConfig(prev => createPlaylistConfig({...prev, familyRatingMin: value}))}
                    max={10}
                    min={1}
                    step={1}
                    label="Family Rating"
                    difference={2}
                />
                <StyledRangeSlider
                    maxValue={props.playlistConfig.pacingRatingMax}
                    minValue={props.playlistConfig.pacingRatingMin}
                    setMaxValue={(value) => props.setPlaylistConfig(prev => createPlaylistConfig({...prev, pacingRatingMax: value}))}
                    setMinValue={(value) => props.setPlaylistConfig(prev => createPlaylistConfig({...prev, pacingRatingMin: value}))}
                    max={10}
                    min={1}
                    step={1}
                    label="Pacing Rating"
                    difference={2}
                />
                <StyledRangeSlider
                    maxValue={props.playlistConfig.gaynessRatingMax}
                    minValue={props.playlistConfig.gaynessRatingMin}
                    setMaxValue={(value) => props.setPlaylistConfig(prev => createPlaylistConfig({...prev, gaynessRatingMax: value}))}
                    setMinValue={(value) => props.setPlaylistConfig(prev => createPlaylistConfig({...prev, gaynessRatingMin: value}))}
                    max={10}
                    min={1}
                    step={1}
                    label="Gayness Rating"
                    difference={2}
                />
                <StyledRangeSlider
                    maxValue={props.playlistConfig.cultureRatingMax}
                    minValue={props.playlistConfig.cultureRatingMin}
                    setMaxValue={(value) => props.setPlaylistConfig(prev => createPlaylistConfig({...prev, cultureRatingMax: value}))}
                    setMinValue={(value) => props.setPlaylistConfig(prev => createPlaylistConfig({...prev, cultureRatingMin: value}))}
                    max={10}
                    min={1}
                    step={1}
                    label="Culture Rating"
                    difference={2}
                />
            </div>
        </Form>
    )
}