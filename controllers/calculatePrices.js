const dataStorage = require("./dataStorage")

function roundTo2Decimals(v) {
  return Math.round(v * 100) / 100
}

function convert(amount, rate) {
  var result = amount * rate
  return result
}

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1])
    if (e) {
      x *= Math.pow(10, e - 1)
      x = "0." + new Array(e).join("0") + x.toString().substring(2)
    }
  } else {
    var e = parseInt(x.toString().split("+")[1])
    if (e > 20) {
      e -= 20
      x /= Math.pow(10, e)
      x += new Array(e + 1).join("0")
    }
  }
  return x
}

function fixBitcoinDecimals(num) {
  var numStr = new String(toFixed(num))
  var decimalOffset = numStr.indexOf(".")
  if (decimalOffset != -1) {
    var integerPart = numStr.substring(0, decimalOffset)
    decimalOffset++
    var decimals = numStr.substring(decimalOffset, decimalOffset + 8)
    num = Number(integerPart + "." + decimals).valueOf()
  }
  return num
}


function getPrice(money) {
  let cryptoRateBTC = dataStorage.getPriceBtc()
  let cryptoRateETH = dataStorage.getPriceEth()
  let cryptoRateDASH = dataStorage.getPriceDash()
  let USD_TO_BS = dataStorage.getPriceBs()

  let listCryptoCurrency = {
    'BTC': cryptoRateBTC,
    'ETH': cryptoRateETH,
    'DASH': cryptoRateDASH,
    'BS': USD_TO_BS
  }

  return listCryptoCurrency[money]

}



function calculatePrices(req, res) {
  let params = req.body
  let type_currency = params.type_currency.toUpperCase()

  switch (type_currency) {
    case 'BTC':
    case 'ETH':
    case 'DASH':
      cryptoPrice(type_currency, params.amount, res)
      break
    case 'BS':
      updateFromBs(params.amount, res)
    case 'USD':
      updateFromUSD(params.amount, res)
    default:caseDefault(res)
  }

}

function caseDefault(res) {
  return res.status(200).send({
    status: "error",
    msg: "debe selecionar una moneda valida",
    monedas_validas: ['BTC', 'ETH', 'DASH', 'BS', 'USD']
  })
}

function cryptoPrice(nameCryptoCurrency, amount, res) {

  let usds = roundTo2Decimals(
    convert(amount, getPrice(nameCryptoCurrency))
  )

  let btcs = fixBitcoinDecimals(usds / getPrice('BTC'))
  let eths = fixBitcoinDecimals(usds / getPrice('ETH'))
  let dashs = fixBitcoinDecimals(usds / getPrice('DASH'))
  let bsfs = roundTo2Decimals(usds * getPrice('BS'))

  let listCryptoCurrency = {
    'BTC': btcs,
    'ETH': eths,
    'DASH': dashs,
    'USD': usds,
    'BS': bsfs
  }
  delete listCryptoCurrency[nameCryptoCurrency]

  return res.status(200).send({
    status: "success",
    [`${amount}:${nameCryptoCurrency} value in other currencies`]: listCryptoCurrency
  })

}


function updateFromBs(amount, res) {
  amount = Number(amount.replace(/,/, ""))
  usds = roundTo2Decimals(amount / getPrice('BS'))
  btcs = fixBitcoinDecimals(usds / getPrice('BTC'))
  eths = fixBitcoinDecimals(usds / getPrice('ETH'))
  dashs = fixBitcoinDecimals(usds / getPrice('DASH'))

  let listCryptoCurrency = {
    'BTC': btcs,
    'ETH': eths,
    'DASH': dashs,
    'USD': usds
  }

  return res.status(200).send({
    status: "success",
    [`${amount}:BS value in other currencies`]: listCryptoCurrency
  })
}

function updateFromUSD(amount, res) {
  amount = Number(amount.replace(/,/, ""))

  btcs = fixBitcoinDecimals(amount / getPrice('BTC'))
  eths = fixBitcoinDecimals(amount / getPrice('ETH'))
  dashs = fixBitcoinDecimals(amount / getPrice('DASH'))
  bs = roundTo2Decimals(amount * getPrice('BS'))

  let listCryptoCurrency = {
    'BTC': btcs,
    'ETH': eths,
    'DASH': dashs,
    'BS': bs
  }
  return res.status(200).send({
    status: "success",
    [`${amount}:USD value in other currencies`]: listCryptoCurrency
  })

}

module.exports = calculatePrices