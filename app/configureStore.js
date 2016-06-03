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

      return true
    });
  }

  return store
}