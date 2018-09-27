// isomorphic rendering implementation
// todo (jp 10/16/2017) upgrade react-router

// import stuff for react server side rendering
// -----------------------------------------------------
import React from 'react'
import { Provider } from 'react-redux'
import createStore from '../../client/store/createStore'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../../client/routes'
import Utils from '../utils/utils'

function handleRouter (req, res, props) {
    // if we got props then we matched a route and can render
    // a good place to fetch data needed for server side rendering

    // Redux Store Initialization
  const store = createStore({ userAccount: {} || {} })

  const appHtml = renderToString(
    <Provider store={store}>
      <RouterContext {...props} />
    </Provider>
    )

    // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  res.send(renderPage(appHtml, JSON.stringify(preloadedState).replace(/</g, '\\u003c')))
}

function handleRedirect (res, redirect) {
  res.redirect(302, redirect.pathname + redirect.search)
}

function handleNotFound (res) {
  res.status(404).send('Not Found')
}

function handleError (res, err) {
  res.status(500).send(err.message)
}

export function isoMiddleware (req, res) {
  const tLogger = Utils.initLogger(req)
  tLogger.info('[server] Request received, url is ', req.url)

  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    if (err) handleError(res, err)
    else if (redirect) handleRedirect(res, redirect)
    else if (props) handleRouter(req, res, props)
    else handleNotFound(res)
  })
}

function renderPage (appHtml, initialState) {
  return `
      <!doctype html>
      <html>
      <head>
      <script>
      window.__APP_INITIAL_STATE__ = ${initialState}
      </script>
      <base href="/static/">
      <meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1">
      <meta charset=utf-8>
      <meta http-equiv=Content-Type content="text/html;charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>Metro</title>
      <link rel=stylesheet href=style.css>
      </head>
      <body>
      <div id=react-app>${appHtml}</div>
      <script src="bundle.js"></script>
      </body>
     `
}
