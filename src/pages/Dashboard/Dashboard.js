import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { If, Then, Else } from 'react-if';
import { Row, Col } from 'reactstrap';

import { LineChart, BarChart, Text } from '../../components/Charts';
import Card from '../../components/Card';
import './Dashboard.scss';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [summaryOption, setSummaryOption] = useState('Pull Requests');
  const summaryOptions = ['Pull Requests', 'Issues'];

  useEffect(() => {
    dispatch({ type: 'GET_PULL_REQUESTS_SAGA' });
  });

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
          <Text title="Average Pull Request Merge Time" data="1day 2h30m" />
        </Col>
        <Col>
          <Text title="Average Issue Close Time" data="5days 3h25" />
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
