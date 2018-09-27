(function () {
  'use strict'
  var constants = {
    vertical: function () {
      return 'activation'
    },
    logOrigin: function () {
      return 'service'
    },
    svcName: function () {
      return 'dashboard'
    },
    svcVersion: function () {
      return process.env.DRP_VERSION
    },
    stage: function () {
      return process.env.DRP_CF_STAGE
    },
    hostname: function () {
      return process.env.HOSTNAME
    },
    logType: function (logtype) {
      if (logtype && logtype.toUpperCase() === 'BUSINESS') {
        return 'business'
      } else {
        return 'technical'
      }
    }
  }
  var logPayload = {
    build: function (options) {
      var payload = {}
      payload['@timestamp'] = new Date()
      payload['@hostname'] = constants.hostname()
      payload['@vertical'] = constants.vertical()
      payload['@type'] = constants.logOrigin()
      payload['@service-name'] = constants.svcName()
      payload['@service-version'] = constants.svcVersion() || 'Not Found'
      payload['@retention'] = constants.logType(options.meta['log-type'] || 'technical')
      payload['@trace-id'] = options.meta['trace-id'] || 'Not Found'
      payload['@trace-id'] = options.meta['trace-id'] || 'Not Found'
      payload['url'] = options.meta['url'] || 'Not Found'
      payload['browser'] = options.meta['browser'] || 'Not Found'
      payload['os'] = options.meta['os'] || 'Not Found'
      payload['device'] = options.meta['device'] || 'Not Found'
      payload['ip'] = options.meta['ip'] || 'Not Found'
      payload['app.error.level'] = options.level.toUpperCase()
      payload['application.stage'] = constants.stage() || 'Not Found'
      payload['message'] = options.message
      payload['username'] = options.meta['username'] || 'Not Found'
      payload['logsource'] = options.meta['logsource'] || 'Not Found'
      payload['errorcode'] = options.meta['errorcode']
      return payload
    }
  }
  module.exports = logPayload
}())
