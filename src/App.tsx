import {Card} from "react-bootstrap"
import {Routes, Route} from "react-router-dom"
import {Home} from "./pages/Home"
import {Backdrop} from "./components/Backdrop"
import {TopSpacer} from "./components/TopSpacer"

export default function App() {
    return (
        <>
            <Backdrop />
            <TopSpacer />
            <Card className="container" style={{padding: "2rem", maxWidth: "56rem"}}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Card>
        </>
    )
}
