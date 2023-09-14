import Lottie from "lottie-react"
import animationData from './assets/lottie.json'
import './lottie.css'
function Lotti() {
    return (
        <div className="circle">
        <Lottie animationData={animationData}/>
        </div >
    )


}

export default Lotti