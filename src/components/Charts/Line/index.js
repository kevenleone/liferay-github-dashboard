import React from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: '10 Feb', Merged: 400, Opened: 240, Closed: 240,
  },
  {
    name: '11 Feb', Merged: 300, Opened: 138, Closed: 220,
  },
  {
    name: '12 Feb', Merged: 200, Opened: 980, Closed: 220,
  },
  {
    name: '13 Feb', Merged: 278, Opened: 398, Closed: 200,
  },
  {
    name: '14 Feb', Merged: 189, Opened: 480, Closed: 211,
  },
  {
    name: '15 Feb', Merged: 239, Opened: 380, Closed: 250,
  },
  {
    name: '16 Feb', Merged: 349, Opened: 430, Closed: 210,
  },
];


export default function ChartLine() {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="natural" strokeWidth={2} dataKey="Opened" stroke="green" activeDot={{ r: 8 }} />
        <Line type="natural" strokeWidth={2} dataKey="Merged" stroke="purple" />
        <Line type="natural" strokeWidth={2} dataKey="Closed" stroke="red" />
        <Legend iconSize={10} iconType="circle" />
      </LineChart>
    </ResponsiveContainer>
  );
}
