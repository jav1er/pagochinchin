const checkCurrentPrice = require("./HttpRequest")
const Urls = require("./constants")
const dataStorage = require("./dataStorage")

async function getPriceBTC(urlCheck) {
  console.log("dentro de getPriceBTC")
  let resultBTC = await checkCurrentPrice(urlCheck.BTC)
  let price = resultBTC?resultBTC.bpi.USD.rate:'No disponible'
  price = Number(price.replace(/,/, ""))
  dataStorage.setPriceBtc(price)
}

async function getPriceETH(urlCheck) {
  console.log("dentro de getPriceETH")
  let resultETH = await checkCurrentPrice(urlCheck.ETH)
  let price = resultETH? resultETH.result.ethusd:'No disponible'
  price = Number(price.replace(/,/, ""))
  dataStorage.setPriceEth(price)
}

async function getPriceDash(urlCheck) {
  console.log("dentro de getPriceDASH")
  let resultDASH = await checkCurrentPrice(urlCheck.DASH)
  let price = resultDASH ? resultDASH[0].current_price:'No disponible'
  dataStorage.setPriceDash(price)  
}

async function returnPrices() {
  await getPriceBTC(Urls)
  await getPriceETH(Urls)
  await getPriceDash(Urls)
}
returnPrices()
setInterval(_=>returnPrices(),60000)
module.exports = returnPrices
