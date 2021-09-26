import React, { Component } from "react";


let width = 300, height =300;
class MyView extends Component{
    constructor(props){
        super(props);
        this.state ={
            canvas : null,
            context : null,
        }
    }

    componentDidMount(){
        const context = this.refs.canvas.getContext('2d');
        context.fillStyle = 'green'
        context.fillRect(100,100,250,250)
        this.setState({context : context});
    }

    render(){
        return(
            <div>
                <canvas ref="canvas" width={width} height={height} />
            </div>
        )
    }
}

export default MyView