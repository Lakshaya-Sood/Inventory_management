(function () {
  'use strict'

  var cassandra = require('cassandra-driver')
  var Utils = require('../utils/utils')
  // var dbClient = require('./dbClient');

  /**
   * Helper module for db related functions.
   */

  var repoHelper = {

    /**
     * Checks if db cient it obtained successfully.
     */
    checkDbClient: function (connection, callback) {
      if (!connection || !connection.execute) {
        callback('Unable to connect to db.')
        return false
      }

      return true
    },

    /**
     * executes query and send back result set.
     */
    executeResultQuery: function (dbClient, query, params, callback) {
      if (!dbClient || !dbClient.execute) {
        return callback('Unable to connect to db.', null)
      }

      dbClient.execute(query,
        params,
          {prepare: true}, function (err, result) {
            try {
              if (!err) {
                if (result.rows.length > 0) {
                  // for (let row of result.rows) {

                  // }
                  return callback(null, result.rows)
                } else {
                  return callback(null, [])
                }
              } else {
                return callback(err, null)
              }
            } catch (error) {
              if (callback) {
                return callback(error.stack)
              }
            }
          })
    },

    executeResultToSingleObjectQuery: function (dbClient, query, params,
      ObjectContructor, propnames, fieldnames, callback) {
      this.executeResultToObjectQuery(dbClient, query, params,
          ObjectContructor, propnames, fieldnames, function (err, result) {
            if (err) {
              return callback(err, null)
            } else if (result.length) {
              return callback(null, result[0])
            } else {
              return callback(null, null)
            }
          })
    },

    /**
     * executes query and send back result array of objects created by parsing results set.
     * dbClient : connection to database
     * query : query to be executed
     * params: parameters to be passed in query
     * ObjectContructor: constructor to be used.
     * propnames: names of properties to be used from ObjectContructor
     * fieldnames: list of db column names to be assigned to fields listed above.
     */
    executeResultToObjectQuery: function (dbClient, query, params,
      ObjectContructor, propnames, fieldnames, callback) {
      this.executeResultQuery(dbClient, query, params, function (error, dataRows) {
        if (error) {
          return callback(error)
        } else {
          let results = []
          for (let row of dataRows) {
            let newObj = new ObjectContructor()
            for (let i = 0; i < propnames.length; i++) {
              newObj[propnames[i]] = row[fieldnames[i]]
            }
            results.push(newObj)
          }

          callback(null, results)
        }
      })
    },

    /**
     * executes query which doest return any results. Like insert and update.
     */
    executeNonQuery: function (dbClient, query, params, callback) {
      if (!dbClient || !dbClient.execute) {
        return callback('Unable to connect to db.', null)
      }
      dbClient.execute(query,
        params, {prepare: true},
        function (error) {
          try {
            if (error) {
              return callback(error)
            }
            return callback(null)
          } catch (error) {
            if (callback) {
              return callback(error.stack)
            }
          }
        })
    },

    /**
     * executes query which doest return any results. Like insert and update.
     */
    executeBatchQuery: function (dbClient, queries, successCallbackData, callback) {
      if (!dbClient || !dbClient.batch) {
        return callback('Unable to connect to db.', null)
      }
      dbClient.batch(queries,
        {prepare: true},
        function (error) {
          try {
            if (error) {
              return callback(error)
            }
            return callback(null, successCallbackData)
          } catch (error) {
            if (callback) {
              return callback(error.stack)
            }
          }
        })
    },

    executeNonQueryWithConsistencyLevel: function (
      dbClient, query, params, consistencyLevel, callback) {
      if (!dbClient || !dbClient.execute) {
        return callback('Unable to connect to db.', null)
      }
      dbClient.execute(query,
        params, {prepare: true, consistency: consistencyLevel},
        function (error) {
          try {
            if (error) {
              return callback(error)
            }
            return callback(null)
          } catch (error) {
            if (callback) {
              return callback(error.stack)
            }
          }
        })
    },

    genConnStrFromUrl: function (conUrl) {
      let connStr = {}
      let parsedUrl = Utils.parseURL(conUrl)
      if (parsedUrl) {
        connStr.contactPoints = [parsedUrl.hostname]
        if (parsedUrl.pathname) {
          connStr.keyspace = parsedUrl.pathname.substring(1)
        }

        if (!connStr.keyspace) {
          // Defaulting keyspace in case it is not in env variable
          connStr.keyspace = 'activation'
        }

        connStr.protocolOptions = {}
        connStr.protocolOptions.port = parsedUrl.port
        if (parsedUrl.auth) {
          let indexOfSep = parsedUrl.auth.indexOf(':')
          if (indexOfSep !== -1) {
            let user = parsedUrl.auth.substring(0, indexOfSep)
            let pwd = parsedUrl.auth.substring(indexOfSep + 1)

            connStr.authProvider = new cassandra.auth.PlainTextAuthProvider(user, pwd)
          }
        }
      }
      return connStr
    }

  }

  module.exports = repoHelper
}())
