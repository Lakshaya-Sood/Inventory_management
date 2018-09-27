'use strict'
var cassandra = require('cassandra-driver')
var Utils = require('../utils/utils')
var repoHelper = require('./repoHelper')
var logger = Utils.initLogger()
var ErrorCodes = require('../constants/errorCodes').errorMessages

var privateFns = {

  genConnStrFromUrl: function (connectionUrl) {
    if (!connectionUrl) {
      connectionUrl = process.env.DRP_PF_CASSANDRA_1
    }
    return repoHelper.genConnStrFromUrl(connectionUrl)
  }

}

var CassandraClient = {

  getDbClient: function () {
    logger.info('Fetching db connection...')

    var connectionUrl = ''

    // let connStr = privateFns.genConnStrFromUrl;

    if (!connectionUrl && !process.env.DRP_PF_CASSANDRA_1) {
      logger.error('3007', ErrorCodes['3007'])
      throw new Error('Environment variable missing. DRP_PF_CASSANDRA_1', 'dbClient.js')
    }

    if (!connectionUrl) {
      connectionUrl = process.env.DRP_PF_CASSANDRA_1
    }

    let connStr = privateFns.genConnStrFromUrl(connectionUrl)
    logger.info('Connection string from url = ' + JSON.stringify(connStr))
    if (!connStr.contactPoints) {
      logger.info('Contact points not present in the conn string.')
      throw new Error('Contact points not present in the conn string.',
        'dbClient.js')
    }
    var client = new cassandra.Client(connStr)
    logger.info('connection obtained.')

    return client
  }
}

module.exports = CassandraClient.getDbClient()
