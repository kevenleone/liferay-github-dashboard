import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Small', Average: 10, pull_request: 10,
  },
  {
    name: 'Medium', Average: 28, pull_request: 50,
  },
  {
    name: 'Large', Average: 48, pull_request: 100,
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
        <YAxis dataKey="Average" />
        <Tooltip />
        <Bar dataKey="Average" fill="#4B9BFF" />
      </BarChart>
    </ResponsiveContainer>
  );
}
