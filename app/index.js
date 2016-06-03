import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './components/Dashboard'
import PhotoDetail from './components/PhotoDetail'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, Redirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Dashboard} />
      <Route path="/photo/:photo_id" component={PhotoDetail} />
      <Redirect from='*' to='/' />
    </Router>
  </Provider>,
  document.getElementById('root')
)
