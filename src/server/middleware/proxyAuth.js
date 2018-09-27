// middleware to read role in the url query and assign that
// role to the user
// after successful authentication req.session.user.authorization
// contains the roles, this middleware overrides the {autorization}
// with the roles passed by user in the query params of the url
// this feature is used for testing application with
// a specific role
import Utils from '../utils/utils'
import _ from 'lodash'

export default function proxyAuth () {
    // this feature is not meant for PROD
  if (process.env.DRP_CF_STAGE === 'prod') {
    return function (req, res, next) {
      next()
    }
  }

    // return middleware implementation
  return function (req, res, next) {
    const tLogger = Utils.initLogger(req)

    try {
      const { role } = req.query

      if (role) {
        // clean up the existing authorization object
        req.session.user.authorization = []

        _.forEach(role.split(','), (role) => {
          req.session.user.authorization.push({
            [role]: []
          })
        })
      }
      tLogger.info('Proxy authorization granted ', JSON.stringify(req.session.user.authorization))
      return next()
    } catch (error) {
      // if there is an error, cant do much
      // auth override will not work but the app should work so
      // execute next middleware
      tLogger.info('Proxy authorization could not be granted ', error)
      return next()
    }
  }
}
