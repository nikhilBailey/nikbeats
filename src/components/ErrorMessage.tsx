import {useEffect, useState} from "react"
import {Themes} from "../context/Themes"
import "../context/errorMessageStyles.css"

export const ErrorMessage = (props) => {

    const isOpen = !props.isDefaultErrorMessage(props.errorMessage)
    const [doAnimation, setDoAnimation] = useState(false)
    useEffect(() => {

        if (isOpen && !doAnimation) setDoAnimation(true)
    }, [isOpen])

    const handleOnClick = () => props.resetErrorMessage()

    return (
        // <div style={{
        //     overflow: "hidden",
        //     ...(!doAnimation ? {
        //         maxHeight: 0,
        //         opacity: 0,
        //         padding: 0
        //     } : isOpen ? {
        //         animation: "expand 1.5s ease forwards",
        //         borderTopRightRadius: ".5em",
        //         borderBottomLeftRadius: ".5em",
        //         borderBottomRightRadius: ".5em"
        //     } : {
        //         animation: "collapse 1.5s ease forwards"
        //     })
        // }}>
        <div className="rounded-3" style={{
            backgroundColor: Themes.softErrorRed,
            border: `3px solid ${Themes.errorRed}`,
            marginBottom: ".6em",
            ...(!doAnimation ? {
                height: 0,
                opacity: 0,
                padding: 0
            } : isOpen ? {
                animation: "expand-error-message 1s ease forwards",
                borderTopRightRadius: ".5em",
                borderBottomLeftRadius: ".5em",
                borderBottomRightRadius: ".5em"
            } : {
                animation: "collapse-error-message 1s ease forwards"
            })
        }}
        onClick={handleOnClick}
        >
            {props.errorMessage}
        </div>
    )
}