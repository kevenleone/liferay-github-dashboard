import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Small', average: 10, pull_request: 10,
  },
  {
    name: 'Medium', average: 28, pull_request: 50,
  },
  {
    name: 'Large', average: 48, pull_request: 100,
  },
];


export default function index() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="average" />
        <Tooltip />
        <Bar dataKey="average" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
