import AppsApi from '../api/AppsApi'
import Utils from '../../utils/utils'

const appsRouteHandler = {

  fetchApps: function (req, res) {
    const tLogger = Utils.initLogger(req)
    const appsApi = new AppsApi(tLogger)

    tLogger.info('[appsRouteHandler] Fetching all apps ')

    appsApi.fetchApps(function (err, data) {
      if (err) {
        tLogger.error('[appsRouteHandler] Something went wrong while fetching apps', JSON.stringify(err))
        res.status(500).json({errors: err})
      } else {
        tLogger.info('[appsRouteHandler] Apps fetched successfully')
        res.json({data: data})
      }
    })
  },

  saveApps: function (req, res) {
  },

  login: function (req, res) {
    const tLogger = Utils.initLogger(req)
    const appsApi = new AppsApi(tLogger)
    tLogger.info('[appsRouteHandler] Login Route Handler ')

    appsApi.login(req.body, function (err, data) {
      if (err) {
        tLogger.error('[appsRouteHandler] Something went wrong while creating product', JSON.stringify(err))
        res.status(500).json({errors: err})
      } else {
        tLogger.info('[appsRouteHandler] Product Created Succesfully ')
        res.status(200).send('OK');
      }
    })

  }
}
export default appsRouteHandler
