import React, { Component } from "react";
import { Card } from "react-bootstrap";
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

  // Helper function to format time labels for full hours only
  formatTimeLabel = (dateStr) => {
    const date = new Date(dateStr);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Only add label if it's the start of the hour (e.g., 2:00, 3:00, etc.)
    if (minutes === 0) {
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;  // 12-hour format
      return `${formattedHours} ${period}`;
    }
    return '';  // Return empty label for non-hourly times
  };

  fetchWaterLevels = async () => {
    try {
      const response = await fetch(
        "https://flood-detection-application-a0czgwa9cqa7g3a9.eastasia-01.azurewebsites.net/waterlevels-last-24-hours"
      );
      const data = await response.json();

      // Generate labels based on the timestamps (full hours only)
      const timeLabels = data.map((entry) => this.formatTimeLabel(entry.date));
      const waterLevels = data.map((entry) => parseFloat(entry.level));

      const limitedTimeLabels = timeLabels.slice(-40);
      const limitedWaterLevels = waterLevels.slice(-40);

      this.setState({
        labels: limitedTimeLabels,
        series: [limitedWaterLevels],  // Ensure all water level data is included
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
            labels: labels,  // Full-hour labels only
            series: series,
          }}
          type="Line"
          options={{
            low: 0,
            high: 90,  // Adjust based on your water level range
            showArea: false,
            height: "250px",
            axisX: {
              showGrid: false,
              labelInterpolationFnc: (value, index) => {
                // Show every 2nd label to reduce overlap
                return index % 2 === 0 ? value : null;
              },
            },
            axisY: {
              onlyInteger: true,
            },
            lineSmooth: false,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 30,  // Reduced right padding to minimize gap
              left: 10,   // Adjust padding for better fit
            },
          }}
          responsiveOptions={[
            [
              "screen and (max-width: 640px)",
              {
                axisX: {
                  labelInterpolationFnc: (value) => {
                    // Display every 4th label on small screens to avoid overlap
                    return value.length > 0 && value[0];
                  },
                },
                chartPadding: {
                  right: 10, // Further reduce padding for small screens
                },
              },
            ],
          ]}
        />
        </div>
        <Card.Footer>
          <div className="legend">
            <i className="fas fa-circle text-info"></i> Water Level
          </div>
          <hr />
          <div className="stats">
            <i className="fas fa-history"></i> Updated: {lastUpdatedFormatted}
          </div>
        </Card.Footer>
      </Card.Body>
    );
  }
}

export default WaterLevelChart;