(function () {
  'use strict'
  var LogWrapper = require('../logWrapper')
  var uuid = require('uuid')
  var url = require('url')
  const Constants = require('../constants/Constants')
  // var uaparser = require('ua-parser');
  var useragent = require('useragent')

  var Utils = {

    initLogger: function (req, source) {
      let traceId = null
      let ua = null
      let browser = null
      let os = null
      let device = null
      let ip = null
      let url = null
      let username = ''

      if (!source) source = Constants.logSource.SERVER

      if (req === null || req === undefined) {
        traceId = uuid.v1()
      } else {
        traceId = req.traceId || uuid.v1()
        url = req.path
        if (req.headers && req.headers['user-agent']) {
          ua = req.headers['user-agent']
          let agent = useragent.parse(req.headers['user-agent'])
          browser = agent.toAgent().toString()
          os = agent.os.toString()
          device = agent.device.toString()
          ip = req.ip
          if (req.session && req.session.user && req.session.user.username) {
            username = req.session.user.username
          }
        }
      }
      return new LogWrapper(traceId, url, browser, os, device, ip, username, source)
    },

    parseURL: function (urlStr) {
      return url.parse(urlStr, true)
    }
  }

  module.exports = Utils
}())
