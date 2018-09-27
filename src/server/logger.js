(function () {
  'use strict'
  const moment = require('moment')
  var logPayload = require('./logPayload')
  var conf
  var winston
  var Logger
  // var clientLogwrapper = require('./clientLogWrapper');
  var eventEmitter

  var dynamicLogger = {

    getLogger: function () {
      return Logger
    }
  }
  try {
    winston = require('winston')

    conf = {
      level: 'debug',
      transports: [
        new (winston.transports.Console)({
          colorize: true,
          prettyPrint: true,
          timestamp: true,
          formatter: function (options) {
            // Return string will be passed to logger.
            let payload = logPayload.build(options)
            // return '[' + payload['@timestamp'] + '] ' + payload.level + ': ' + payload.message;
            return moment(payload['@timestamp']).format('HH:mm:ss') +
            ':' + payload.logsource + ':' + payload.level + ':' + payload.message
            // return JSON.stringify(logPayload.build(options));
          }
        })
      ]
    }

    Logger = new (winston.Logger)(conf)
    Logger.transports.console.colorize = true

      // eventEmitter = require('./utils/configWatcher');
      // eventEmitter.on(constants.CONFIG_CHANGE, dynamicLogger.updateLogger);
    // }
  } catch (e) {
    console.log('An error occured while instantiating logger ' + e.stack)
    Logger = console
  }
  module.exports = dynamicLogger
}())
