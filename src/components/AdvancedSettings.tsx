import {useEffect, useState} from "react"
import {Button} from "react-bootstrap"
import {StyledInputGroup} from "./StyledInputGroup"
import "../context/advancedSettingsStyles.css"
import {Themes} from "../context/Themes";
import {StyledLabel} from "./StyledLabel";
import {createPlaylistConfig} from "../PlaylistGenerator/Playlist";
import {createGeneratorConfig} from "../PlaylistGenerator/Generator";

export const AdvancedSettings = (props) => {
    const [isOpen, setIsOpen]: [boolean, (boolean) => void] = useState(false)

    const toggleIsOpen = () => setIsOpen(prev => !prev)

    const settingsButtonProps = {
        isOpen,
        toggleIsOpen,
        carrotProportion: 0.5,
        height: 2.5,
        width: 4,
        backgroundColor: Themes.darkGreen,
        carrotColor: Themes.lightGreen
    }

    const [doAnimation, setDoAnimation] = useState(false)
    useEffect(() => {

        if (isOpen && !doAnimation) setDoAnimation(true)
    }, [isOpen])

    const generateOnChange = (min: number, max: number, fieldName: string, configIsPlaylistNotGenerator) => {
        return (event) => {
            let newValue = parseInt(event.target.value)

            if (isNaN(newValue) || newValue < min) newValue = min
            if (newValue > max) newValue = max

            if (configIsPlaylistNotGenerator) {
                props.setPlaylistConfig(prev => {

                    const newConfig = {...prev}
                    newConfig[fieldName] = newValue

                    return createPlaylistConfig(newConfig)
                })
            }
            else {
                props.setGeneratorConfig(prev => {

                    const newConfig = {...prev}
                    newConfig[fieldName] = newValue

                    return createGeneratorConfig(newConfig)
                })
            }
        }
    }

    return (
        <>
            <div style={{display: "flex", flexFlow: "row", flexWrap: "nowrap", gap: ".25em"}}>
                <AdvancedSettingsButton {...settingsButtonProps} />
                <Button style={{backgroundColor: Themes.darkGreen, boxShadow: `inset 0 0 0 .2em ${Themes.white}`, border: "none"}} onClick={props.generate}>Generate</Button>
            </div>
            <div style={{backgroundColor: Themes.darkGreen}}>
                <div style={{
                    overflow: "hidden",
                    ...(!doAnimation ? {
                        maxHeight: 0,
                        opacity: 0,
                        padding: 0
                    } : isOpen ? {
                        animation: "expand 1.5s ease forwards",
                        borderTopRightRadius: ".5em",
                        borderBottomLeftRadius: ".5em",
                        borderBottomRightRadius: ".5em"
                    } : {
                        animation: "collapse 1.5s ease forwards"
                    })
                }}>
                    <StyledLabel color={Themes.white} label="Advanced Settings" />
                    <hr style={{color: Themes.white}} />
                    <StyledLabel color={Themes.white} label="Overshoot Seconds" />
                    <StyledInputGroup
                        value={props.playlistConfig.allowedOvershoot}
                        onChange={generateOnChange(0, 999, "allowedOvershoot", true)}
                        label="Seconds"
                    />
                    <hr style={{color: Themes.white}} />
                    <StyledLabel color={Themes.white} label="Generator Parameters" />
                    <StyledInputGroup
                        value={props.generatorConfig.maxBatchAttempts}
                        onChange={generateOnChange(0, 99, "maxBatchAttempts", false)}
                        label="Attempts"
                    />
                    <StyledInputGroup
                        value={props.generatorConfig.maxBatchSize}
                        onChange={generateOnChange(0, 99, "maxBatchSize", false)}
                        label="Batch Size"
                    />
                    <StyledInputGroup
                        value={props.generatorConfig.songsBetweenBatches}
                        onChange={generateOnChange(0, 99, "songsBetweenBatches", false)}
                        label="Batch Gap"
                    />
                    <StyledInputGroup
                        value={props.generatorConfig.revisitMultiplier}
                        onChange={generateOnChange(0, 99, "revisitMultiplier", false)}
                        label="Revisit Mult"
                    />
                </div>
            </div>
        </>
    )
}

const AdvancedSettingsButton = (props) => {

    const adjustForChild = (value) => (value / 2 * (1.0 - props.carrotProportion)) / props.carrotProportion

    return (
        <div onClick={props.toggleIsOpen} style={{
            position: "relative",
            width: `${props.width / props.carrotProportion}em`,
            height: `${props.height / props.carrotProportion}em`,
            backgroundColor: props.backgroundColor,
            fontSize: `${props.carrotProportion}em`,
            borderTopLeftRadius: ".5em",
            borderTopRightRadius: ".5em"
        }}>
            {/*<div style={{position: "absolute"}} />*/}
            <div style={{
                position: "absolute",
                height: 0,
                width: 0,
                borderLeft: `${props.width / 2}em solid transparent`,
                borderRight: `${props.width / 2}em solid transparent`,
                transform: `translate(${adjustForChild(props.width)}em, ${adjustForChild(props.height)}em)`,
                ...(!props.isOpen ? {borderTop: `${props.height}em solid ${props.carrotColor}`} : {borderBottom: `${props.height}em solid ${props.carrotColor}`})
            }} />
        </div>
    )
}