import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerReducer } from 'react-router-redux'
import reducers from './reducers'


const loggerMiddleware = createLogger()
const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

export default function configureStore(initialState) {
  let store;

  if(module.hot){
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(
          thunkMiddleware,
          loggerMiddleware
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    )

  }else{
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware), f=>f
    ))
  }

  if (module.onReload) {
    module.onReload(() => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer.default || nextReducer);

      // return true to indicate that this module is accepted and
      // there is no need to reload its parent modules
      return true
    });
  }

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./reducers', () => {
  //     const nextRootReducer = require('./reducers').default
  //     store.replaceReducer(nextRootReducer);
  //   })
  // }

  return store
}