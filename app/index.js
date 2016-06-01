import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import Dashboard from './components/Dashboard.js'
import Layout from './components/Layout.js'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, hashHistory, IndexRoute, IndexRedirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './configureStore'

/** Looks like we can cut this */
if (module.hot) {
  module.hot.accept()
  module.hot.decline("./routes.js")
}

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRedirect to="/app" />
        <Route path="/app" component={App} />
        <Route path="/dashboard" component={Dashboard} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
