var logger = require('./logger')

function logWrapper (uuid, url, browser, os, device, ip, username, logSource) {
  'use strict'
  this.uuid = uuid || null
  this.url = url || null
  this.browser = browser || null
  this.os = os || null
  this.device = device || null
  this.ip = ip || null
  this.username = username || ''
  this.logtype = null
  this.logSource = logSource
  this.errorcode = 0
}

logWrapper.prototype.getAddlAttrs = function () {
  'use strict'
  return {
    'trace-id': this.uuid,
    'url': this.url,
    'browser': this.browser,
    'os': this.os,
    'device': this.device,
    'ip': this.ip,
    'username': this.username,
    'log-type': this.logtype,
    'logsource': this.logSource,
    'errorcode': this.errorcode
  }
}

logWrapper.prototype.traceId = function () {
  'use strict'
  return this.uuid
}

logWrapper.prototype.log = function (fn, args) {
  'use strict'
  let logArgs = []
  Object.keys(args).map(function (key) {
    logArgs.push(args[key])
  })
  logArgs.push(this.getAddlAttrs())
  fn.apply(logger.getLogger(), logArgs)
}

logWrapper.prototype.trace = function () {
  'use strict'
  this.log(logger.getLogger().trace, arguments)
}

logWrapper.prototype.debug = function () {
  'use strict'
  this.log(logger.getLogger().debug, arguments)
}

logWrapper.prototype.info = function () {
  'use strict'
  this.log(logger.getLogger().info, arguments)
}

logWrapper.prototype.logAuditTrial = function () {
  'use strict'
  this.logtype = 'business'
  this.log(logger.getLogger().info, arguments)
  this.logtype = 'technical'
}

logWrapper.prototype.error = function () {
  'use strict'
  if (!isNaN(arguments[0])) {
    this.errorcode = arguments[0]
    Array.prototype.splice.call(arguments, 0, 1)
    this.log(logger.getLogger().error, arguments)
    this.errorcode = 0
  } else {
    this.log(logger.getLogger().error, arguments)
  }
}

logWrapper.prototype.warn = function () {
  'use strict'
  this.log(logger.getLogger().warn, arguments)
}

module.exports = logWrapper
