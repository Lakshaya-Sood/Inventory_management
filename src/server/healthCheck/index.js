// healthCheck.js
// middleware to perform health check of the app
// todo: instead of sending proxy status, check DB connection

var express = require('express')
var router = express.Router()

// handler for the healthcheck routes
router.get('/live', function (req, res, next) {
  res.status(200).send()
})
router.get('/ready', function (req, res, next) {
  res.status(200).send()
})
router.get('/metrics', function (req, res, next) {
  res.status(200).send()
})

export default router
