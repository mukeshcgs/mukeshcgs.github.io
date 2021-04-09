// import { applyMiddleware, createStore, compose } from "redux"
// import { createLogger } from "redux-logger"
// import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"
// import { Router, Route, browserHistory } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
// import { routerMiddleware, push } from 'react-router-redux'
// import ReduxWPAPI from 'redux-wpapi';

// import reducer from "./reducers"
// const { reducer: wp, middleware } = new ReduxWPAPI({ wwpp });
// const middleware = applyMiddleware(promise(), thunk, createLogger())

// export default createStore(
//   reducer,
//   wp,
//     compose(
//     middleware,
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   )
// )


import { applyMiddleware, createStore, compose } from "redux"
import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { routerMiddleware, push } from 'react-router-redux'

import reducer from "../reducers"

const middleware = applyMiddleware(promise(), thunk, createLogger())

export default createStore(
  reducer,
    compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
