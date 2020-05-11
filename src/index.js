import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* Components */

// Site Header
class SiteHeader extends Component {
  
    render() {

        return (

            <div id="header">
                <h1>Star Generator</h1>
                <p>Enter in a width and height and click on the Regenerate button to recreate the Star Map. Right click the Star Map to save as an image.</p>
                <hr />
            </div>

        );

    }

}

// Star Map Component - Contains the Star Map and Editor, including methods to control the map.
class StarMap extends Component {

    constructor(props) {

        super(props);

        this.state = {

            width: 640,
            height: 480,

        }

    }

    componentDidMount() {

        const canvas = this.refs.canvasRef;
        const ctx = canvas.getContext('2d');

        const width = this.state.width;
        const height = this.state.height;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        this.generateStars(ctx);

    }

    generateStars(ctx) {

        console.clear();

        var rndNum;

        var starCount = 0;
        var brightness = "Standard";

        for (var w = 0; w < this.state.width; w++) {

            for (var h = 0; h < this.state.height; h++) {

                rndNum = Math.random() * 1000;

                if (rndNum >= 999) {

                    if (rndNum < 999.75) {

                        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                        brightness = "Standard";

                    } else {

                        ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
                        brightness = "Bright";

                    }

                    // Create Star
                    ctx.fillRect(w + 1, h + 1, 1, 1);
                    starCount++;
                    console.log("Star #" + starCount + " was generated at (" + w + ", " + h + "). It's brightness is " + brightness);

                }

            }

        }

        console.log(starCount + " stars generated!")

    }

    regenerate(ctx) {

        const width = this.state.width;
        const height = this.state.height;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        this.generateStars(ctx);


    }

    reset() {

        console.clear();

        this.setState({ width: 640, height: 480 });

        this.componentDidMount();

    }

    render() {

        return (
            <div StarMapApp>
                <form name="mapEditor">

                    Width: <input type="number" name="imageWidth" onChange={w => { this.setState({ width: w.target.value }); this.componentDidMount(); }} value={this.state.width} ref="inputWidth" />
                    Height: <input type="number" name="imageHeight" onChange={h => { this.setState({ height: h.target.value }); this.componentDidMount(); }} value={this.state.height} ref="inputHeight" />
                    <button onClick={e => {
                        const canvas = this.refs.canvasRef;
                        const ctx = canvas.getContext('2d');
                        this.regenerate(ctx);
                    }} type="button">Regenerate</button>
                    <button type="button" onClick={e => { this.reset() }}>Reset</button>

                </form>
                <canvas id="StarMap" width={this.state.width} height={this.state.height} ref="canvasRef" ></canvas>
            </div>
        );

    }

}

class SiteFooter extends Component {

    render() {

        return (
            <div id="footer">

            </div>
        );

    }

}

class Application extends Component {

    render() {

        return (

            <div id="Application">
                <SiteHeader />
                <StarMap id="Map"></StarMap>
            </div>

        );
    }

}

/* Render Page */

ReactDOM.render(<Application />, document.getElementById("root"));