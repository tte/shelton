import React from 'react'
import { Provider } from 'react-redux'
const routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRedirect to="/app" />
        <Route path="/app" component={App} />
        <Route path="/dashboard" component={Dashboard} />
      </Route>
    </Router>
  </Provider>
)

export default routes