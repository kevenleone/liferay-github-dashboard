import React, { useState } from 'react';
import { If, Then, Else } from 'react-if';
import { Row, Col } from 'reactstrap';

import LineChart from '../../components/Charts/Line';
import BarChart from '../../components/Charts/Bar';
import Card from '../../components/Card';
import './Dashboard.scss';

export default function Dashboard() {
  const [summaryOption, setSummaryOption] = useState('Pull Requests');
  const summaryOptions = ['Pull Requests', 'Issues'];
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
            <Row className="month-summary">
              <Col xs={2}>
                <Row>
                  { summaryOptions.map((summary, index) => (
                    <Col key={summary} className={summaryOption === summary ? 'active' : ''}>
                      <button
                        type="button"
                        onClick={() => setSummaryOption(summary)}
                      >
                        {summary}
                      </button>
                      <p>{38 * (index + 1)}</p>
                    </Col>
                  )) }
                </Row>
              </Col>
            </Row>
            <If condition={summaryOption === 'Pull Requests'}>
              <Then>
                <LineChart />
              </Then>
              <Else>
                <LineChart />
              </Else>
            </If>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
