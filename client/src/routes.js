import { Route, IndexRoute } from 'react-router'
import React from 'react'
import App from './sub.app.js'
import Home from './containers/home'

import auth from './utility/auth.service'

function requireAuth (nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function redirectAuthUsers (nextState, replace) {
  if (auth.loggedIn()) {
    if (auth.getNext() === 'addPages') {
      auth.removeNext()
      return replace({
        pathname: '/addfbpages',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    replace({
      pathname: '/dashboard',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} onEnter={redirectAuthUsers} />
  </Route>

)

export default routes
