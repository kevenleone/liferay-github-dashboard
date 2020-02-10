# 

<p align="center"> Github Insights made with React </p>

<p align="center">
  <a href='https://app.netlify.com/sites/liferay-github-dashboard/deploys'><img src='https://api.netlify.com/api/v1/badges/136190dc-5fbe-4f4c-9581-6f99a3cf57c3/deploy-status' alt='Netlify Status' />
  </a>
</p>

## :bulb: Introduction 

This project is a dashboard application that provide insights from a specific Github Repository, made with React and Redux.

You can check the application online on -> https://liferay-github-dashboard.netlify.com/


## :tada: Features

Graphscript implement the following features


- :book: **React Redux** -> Para gerenciamento de estados e side effects com redux-saga
- :nail_care: **Bootstrap** -> Framework para criação de componentes e interfaces. 
- :zap: **Axios** -> Para fazer requisições a API V4 do GitHub.
- :chart_with_upwards_trend: **Recharts** -> Para criação dos gráficos. 

## :house: Getting started

1. Clone this repo using: `https://github.com/kevenleone/liferay-github-dashboard.git`
2. Install the packages using your preference package manager ( yarn install or npm install )
3. Rename the .env.example to .env, and change REACT_APP_GITHUB_TOKEN for your personal token, click <a href='https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line'> here</a>.
4. Open the browser on: `http://localhost:3000`

## :zap: Commands
- `npm start` - start the application with hot-reload at `http://localhost:3000`
- `npm run build` - Generate a application bundle and a `build` folder.
- `npm run test` - Run unit tests

## :ticket: About the project

The dashboards can be configured on <code>charts.js</code>, in this file you can configure dynamic the charts to be renderized in Dashboard Page (pages/dashboard)

Just add on main array the follow structure:

```javascript

  key: 'your_dashboard_id', // Important to obtain data from Redux (github.dashboard)
  title: 'Cool Dashboard', // Title of the card
  cols: { // cols according bootstrap pattern
    xs: 12,
    xl: 6
  },
  render: {
    Component: MainChart,
    props: {
      ...mainChartProps // props of MainChart
    }
  }
```
This way you can create dynamic charts, without the need of write Javascript code inside the <code>pages/dashboard</code>

The file <code>helpers.js</code> were made to keep the functions and utils for application.