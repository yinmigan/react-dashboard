import React from "react";
import ChartistGraph from "react-chartist";
import WaterLevelGauge from "./WaterLevelGauge";
import Weatherboard from "./WeatherCard";
import WaterLevelChart from "./WaterLevelChart";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {
  return (
    <>
      <Container fluid>
        {/* <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-sun-fog-29 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Temperature</p>
                      <Card.Title as="h4">15.20</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-umbrella-13 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Humidity</p>
                      <Card.Title as="h4">$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-compass-05 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Barometric Pressure</p>
                      <Card.Title as="h4">23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Precipitation</p>
                      <Card.Title as="h4">+45K</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row> */}
        <Weatherboard />
        <Row>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Water Depth</Card.Title>
                <p className="card-category">Water Level Percentage</p>
              </Card.Header>
              {/* <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["40%", "20%", "40%"],
                      series: [40, 20, 40],
                    }}
                    type="Pie"
                  />
                  <WaterLevelGauge />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Safe <i className="fas fa-circle text-warning"></i>
                  Warning <i className="fas fa-circle text-danger"></i>
                  Danger
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Last Update as of 12:30 pm
                </div>
              </Card.Body> */}
              <WaterLevelGauge />
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Water Level Last 24 hrs</Card.Title>
                <p className="card-category">24 Hours Water Level Trend</p>
              </Card.Header>
              <WaterLevelChart />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
