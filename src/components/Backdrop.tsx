import backdrop from '../data/enhancedBackdrop.jpg'

export const Backdrop = () => {
    return (
        <img src={backdrop} style={{position: "absolute", width: "100%", height: "auto", minHeight: "100%", objectFit: "inherit", zIndex: -1}} alt="" />
    )
}