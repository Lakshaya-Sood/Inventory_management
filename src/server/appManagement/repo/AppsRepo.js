import dbClient from '../../helpers/dbClient'
import repoHelper from '../../helpers/repoHelper'
import QUERIES from './dbQueries'
import AppModel from '../models/AppModel'
const axios = require('axios');
const FormData = require('form-data');
const https = require('https')


export default class AppsRepo {
  constructor (logger) {
    this.logger = logger
  }

  browseAppsByAppId (callback) {
    this.logger.info('[appsRepo] Fetching all apps ')
    return callback(null, [])
  }
  serialize(obj) {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };
  
  login (product, callback) {
    let self = this;
    this.logger.info('[appsRepo] Loginng IN ')
     //At request level
     const agentNew = new https.Agent({
      rejectUnauthorized: false
     });
    axios('https://localhost:8443/catalog/control/login',{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: this.serialize({
        'USERNAME':'admin',
        'PASSWORD':'ofbiz',
        'JavaScriptEnabled':'Y'
      }),
      httpsAgent: agentNew
      })
      .then(function (response) {
          //handle success
          const agent = new https.Agent({
            rejectUnauthorized: false
           });
          axios('https://localhost:8443/catalog/control/createProduct',{
            method: 'POST',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Cookie": response.headers["set-cookie"].join(";")
            },
            data: self.serialize(product),
            httpsAgent: agent
            }).then(function (response) {
              //handle success
              console.log('Repo - Product Created');
              return callback(null, [])
            })
            .catch(function (error){
              console.log("Repo - Error during product creation", error)
              return callback(error,[])
            })
      })
      .catch(function (error) {
          //handle error
          console.log("Repo- Error during login ", error);
          return callback(error,[])
      });

    
  
  }

  
  }
