import { Slide } from "@mui/material"

const SlideTransition = (props:any):JSX.Element => {
    return (
        <Slide {...props} direction={"left"}/>
    )
}
export default SlideTransition