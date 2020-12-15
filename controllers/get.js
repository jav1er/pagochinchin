"use strict"

let dataStorage = require("./dataStorage")
let get = {
  getApiPrices(req, res){
    console.log('estas en getApiPrices')
    let priceBTC =  dataStorage.getPriceBtc()
    let priceETH =  dataStorage.getPriceEth()
    let priceDASH = dataStorage.getPriceDash()
    let USD_TO_BS = dataStorage.getPriceBs()
    let prices = {
      'BTC':priceBTC,
      'ETH':priceETH,
      'DASH':priceDASH,
      'USD_TO_BS':USD_TO_BS
    }
     delete prices[priceBTC || 'BTC']
     delete prices[priceBTC || 'ETH']
     delete prices[priceBTC || 'DASH']
    console.log(prices)


    if(!Object.keys(prices).length){
      console.log(Object.keys(prices).length);
      return res.status(500).send({
        status: "error",
        message:'por favor intente mas tarde',
        prices
      })
    }

    return res.status(200).send({
      status: "success",
      prices
    })

    
  },

}

module.exports = get
