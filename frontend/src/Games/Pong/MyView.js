import React, { useRef } from "react";
import Webcam from "react-webcam";


let width = 300, height =300;
function MyView (){
    const webcamRef = useRef(null);
   
        return(
            <div>
                 <Webcam
                    ref={webcamRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 300,
                        height: 300,
                    }}
                    />
            </div>
        )
}

export default MyView