import React from 'react';
import { Row, Col } from 'reactstrap';

import Card from '../../components/Card';
import BarChart from '../../components/Charts/Bar';
import LineChart from '../../components/Charts/Line';
import './Dashboard.scss';

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <Row>
        <Col>
          <Card title="Average Merge Time by Pull Request Size">
            <BarChart />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card title="Average Pull Request Merge Time">
            <div className="time">
              <p>1day 2h30m</p>
            </div>
          </Card>
        </Col>
        <Col>
          <Card title="Average Issue Close Time">
            <div className="time">
              <p>5days 3h25m</p>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card title="Month Summary">
            <LineChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
