import Repo from '../repo/AppsRepo'
import Product from '../models/Product'


export default class AppsApi {
  constructor (logger) {
    this.logger = logger
    this.appsRepo = new Repo(logger)
  }

  fetchApps (callback) {
    const tLogger = this.logger
    tLogger.info('[appsApi] Fetching all apps ')
    this.appsRepo.browseAppsByAppId(callback)
  }

  login (inputData, callback) {
    const tLogger = this.logger
    tLogger.info('[appsApi] Login API ');
    var product = new Product(
    inputData.productID,
    inputData.internalName,
    inputData.brandName,
    inputData.productName,
    inputData.information,
    inputData.ReleaseDate,
    inputData.DiscontinuationDate,
    inputData.UnitOfMeasurement,
    inputData.productWeight)
    //console.log(product);
    this.appsRepo.login(product, callback)
  }
}
