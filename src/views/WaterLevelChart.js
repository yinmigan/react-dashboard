import React, { Component } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import ChartistGraph from "react-chartist";

class WaterLevelChart extends Component {
  state = {
    labels: [],
    series: [[]],
    lastUpdated: null,
  };

  componentDidMount() {
    this.fetchWaterLevels();
  }

  fetchWaterLevels = async () => {
    try {
      const response = await fetch(
        "https://flood-detection-application-a0czgwa9cqa7g3a9.eastasia-01.azurewebsites.net/waterlevels-last-24-hours"
      );
      const data = await response.json();

      // Assuming the API returns an array of objects with time and waterLevel properties
      const labels = data.map((entry) => entry.date);
      const series = [data.map((entry) => entry.level)];

      this.setState({
        labels,
        series,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error("Error fetching water level data:", error);
    }
  };

  render() {
    const { labels, series, lastUpdated } = this.state;

    const lastUpdatedFormatted = lastUpdated
      ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
      : "Loading...";

    return (
        <Card.Body>
        <div className="ct-chart" id="chartHours">
            <ChartistGraph
            data={{
                labels: labels,
                series: series,
            }}
            type="Line"
            options={{
                low: 0,
                high: 90, // Adjust based on your water level range
                showArea: false,
                height: "250px",
                axisX: {
                showGrid: false,
                },
                lineSmooth: false,
                showLine: true,
                showPoint: true,
                fullWidth: true,
                chartPadding: {
                right: 50,
                },
            }}
            responsiveOptions={[
                [
                "screen and (max-width: 640px)",
                {
                    axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    },
                    },
                },
                ],
            ]}
            />
        </div>
        <Card.Footer>
            <div className="legend">
                <i className="fas fa-circle text-info"></i>
                Water Level 
                {/* <i className="fas fa-circle text-warning"></i>
                Warning <i className="fas fa-circle text-danger"></i>
                Danger */}
            </div>
            <hr></hr>
            <div className="stats">
                <i className="fas fa-history"></i>
                Updated: {lastUpdatedFormatted}
            </div>
        </Card.Footer>
        </Card.Body>
        
    );
  }
}

export default WaterLevelChart;
