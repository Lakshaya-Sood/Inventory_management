// appmanagementapp.js
import appsRouteHandler from './appsRouteHandler'
var express = require('express')
var router = express.Router()

// ROUTES
// ====================================================
// This approach re-uses the single /apps path
// and adds handlers for various HTTP methods. Cool isnt it? :-)

router.route('/apps')
  .get(appsRouteHandler.fetchApps)
  .post(appsRouteHandler.saveApps)
  
router.route('/loginOfbiz')
.post(appsRouteHandler.login)

export default router
