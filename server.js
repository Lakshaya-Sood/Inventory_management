// server.js
// where magic happens :-)

import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import favicon from 'serve-favicon'
import { isoMiddleware } from './src/server/middleware/iso'
//import proxyAuth from './src/server/middleware/proxyAuth'

// import express-session and peers
// -----------------------------------------------------
// import session from 'express-session'
// import CassandraStore from 'cassandra-store'
//import dbClient from './src/server/helpers/dbClient'

// import express-subapps
// ---------------------------------------------
import healthCheck from './src/server/healthCheck'
import appManagement from './src/server/appManagement'

// Ensure required ENV vars are set
const requiredEnv = [
  'DRP_CF_HTTP_PORT',
  'DRP_PF_CASSANDRA_1',
  'DRP_CF_STAGE'
]
const unsetEnv = requiredEnv.filter((env) => !(typeof process.env[env] !== 'undefined'))

if (unsetEnv.length > 0) {
  throw new Error('Required ENV variables are not set: [' + unsetEnv.join(', ') + ']')
}

const app = express()

// Gzip compressing can greatly decrease the size of
// the response body and hence increase the speed of a web app.
app.use(compression())

// Helmet can help protect your app from
// some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet())

// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {}
global.navigator.userAgent = global.navigator.userAgent || 'all'

//
// Register Node.js middleware
// ---------------------------------------------------------

// serve our static stuff like index.css
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')))
app.use('/static', express.static(path.join(__dirname, 'dist'), {fallthrough: false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('secret_eac'))
 
// setup express-session
// Express will create a new session
// (and write it to the database) whenever it does not detect a session cookie
// in the request
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   store: new CassandraStore({
//     table: 'sessions',
//     client: dbClient
//   }),
//   secret: 'secret_eac',
//   cookie: { secure: true, maxAge: 3600000 }, // 1 hour
//   resave: false, // write to the session store
//   saveUninitialized: false // dont save sessions if they're not changed
// }))

// subapp for health checks
// -----------------------------------------------------------
// -----------------------------------------------------------

app.use('/.well-known', healthCheck)

// subapp for app management
// -----------------------------------------------------------
// -----------------------------------------------------------
app.use('/am/api', appManagement)

// redirect to apps screen on root dns request
app.get('/', (req, res, next) => {
  res.redirect('/dashboard')
})

// logout
app.get('/logout', (req, res) => {
  res
    .clearCookie('connect.sid')
    .sendFile('login.html', {root: path.join(__dirname, 'dist')})
})

// send all requests to index.html so browserHistory in React Router works
app.get('*', isoMiddleware)

app.listen(process.env.DRP_CF_HTTP_PORT)
