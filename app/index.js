import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './components/Dashboard'
import PhotoDetail from './components/PhotoDetail'
import Layout from './components/Layout'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, hashHistory, IndexRoute, IndexRedirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRedirect to="/dashboard" />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/photo/:photo_id" component={PhotoDetail} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
