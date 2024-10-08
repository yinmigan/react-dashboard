import React from "react";
import ChartistGraph from "react-chartist";
import WaterLevelGauge from "./WaterLevelGauge";
import Weatherboard from "./WeatherCard";
import WaterLevelChart from "./WaterLevelChart";
import ChatCard from "./ChatCard";
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
        <Weatherboard />
        <Row>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Water Depth</Card.Title>
                <p className="card-category">Water Level Percentage</p>
              </Card.Header>
              <WaterLevelGauge />
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Flood Detector Bot</Card.Title>
                <p className="card-category">Ask any information related to the water level</p>
              </Card.Header>
              <ChatCard />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
