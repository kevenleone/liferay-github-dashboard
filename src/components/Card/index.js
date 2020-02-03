import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardTitle, CardHeader, CardBody,
} from 'reactstrap';

export default function CardIndex({ title, children }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          { title }
        </CardTitle>
      </CardHeader>
      <CardBody>
        { children }
      </CardBody>
    </Card>
  );
}

CardIndex.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
