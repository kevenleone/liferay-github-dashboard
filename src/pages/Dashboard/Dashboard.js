import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { If, Then, Else } from 'react-if';
import { Row, Col } from 'reactstrap';

import { LineChart } from '../../components/Charts';
import Card from '../../components/Card';
import charts from '../../utils/charts';
import './Dashboard.scss';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.github);
  const [summaryOption, setSummaryOption] = useState('Pull Requests');
  const summaryOptions = ['Pull Requests', 'Issues'];

  useEffect(() => {
    dispatch({ type: 'GET_PULL_REQUESTS_SAGA' });
  }, [dispatch]);

  return (
    <div className="Dashboard">
      <Row>
        { charts.map(({
          key, title, cols, chart: { Component, props },
        }) => (
          <Col key={key} {...cols}>
            <Card title={title}>
              <Component data={dashboard[key].data} {...props} />
            </Card>
          </Col>
        ))}
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
