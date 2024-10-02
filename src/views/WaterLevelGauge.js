import React, { Component } from "react";
import { Card } from "react-bootstrap";
import LiquidFillGauge from "react-liquid-gauge";
import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";

class WaterLevelGauge extends Component {
  state = {
    value: 50, // Default value while loading
    lastUpdated: null
  };

  startColor = "#6495ed"; // cornflowerblue
  endColor = "#dc143c"; // crimson

  // Fetch water level from the API
  fetchWaterLevel = async () => {
    try {
      const response = await fetch("https://flood-detection-application-a0czgwa9cqa7g3a9.eastasia-01.azurewebsites.net/get-water-level");
      const data = await response.json();
      console.log("DATA", data.level)
      if (data && data.level) {
        this.setState({ 
          value: data.level, 
          lastUpdated: new Date() // Store the current date and time
        });
      } else {
        console.error("Invalid response data:", data);
        this.setState({ 
          value: 0, 
          lastUpdated: new Date() // Store the current date and time
        });
      }
    } catch (error) {
      console.error("Error fetching water level:", error);
    }
  };

  componentDidMount() {
    // Fetch the water level when the component mounts
    this.fetchWaterLevel();
  }

  render() {
    const { value, lastUpdated } = this.state;
    const radius = 120; // Adjust size to fit the card
    const interpolate = interpolateRgb(this.startColor, this.endColor);
    const fillColor = interpolate(value / 100);
    const gradientStops = [
      {
        key: "0%",
        stopColor: color(fillColor).darker(0.5).toString(),
        stopOpacity: 1,
        offset: "0%"
      },
      {
        key: "50%",
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: "50%"
      },
      {
        key: "100%",
        stopColor: color(fillColor).brighter(0.5).toString(),
        stopOpacity: 0.5,
        offset: "100%"
      }
    ];

    const lastUpdatedFormatted = lastUpdated
      ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
      : "Loading...";

    return (
      <Card.Body>
        <div className="ct-chart ct-perfect-fourth">
          <LiquidFillGauge
            style={{ margin: "0 auto" }}
            width={radius * 2}
            height={radius * 2}
            value={this.state.value}
            percent="%"
            textSize={1}
            textOffsetX={0}
            textOffsetY={0}
            textRenderer={props => {
              const value = Math.round(props.value);
              const radius = Math.min(props.height / 2, props.width / 2);
              const textPixels = (props.textSize * radius) / 2;
              const valueStyle = {
                fontSize: textPixels
              };
              const percentStyle = {
                fontSize: textPixels * 0.6
              };

              return (
                <tspan>
                  <tspan className="value" style={valueStyle}>
                    {value}
                  </tspan>
                  <tspan style={percentStyle}>{props.percent}</tspan>
                </tspan>
              );
            }}
            riseAnimation
            waveAnimation
            waveFrequency={2}
            waveAmplitude={1}
            gradient
            gradientStops={gradientStops}
            circleStyle={{
              fill: fillColor
            }}
            waveStyle={{
              fill: fillColor
            }}
            textStyle={{
              fill: color("#444").toString(),
              fontFamily: "Arial"
            }}
            waveTextStyle={{
              fill: color("#fff").toString(),
              fontFamily: "Arial"
            }}
          />
        </div>
        <div className="legend">
          <i className="fas fa-circle text-info"></i> Water Level 
          {/* <i className="fas fa-circle text-warning"></i> Warning{" "}
          <i className="fas fa-circle text-danger"></i> Danger */}
        </div>
        <hr />
        <div className="stats">
          <i className="far fa-clock"></i> Last Update as of {lastUpdatedFormatted}
        </div>
      </Card.Body>
    );
  }
}

export default WaterLevelGauge;
