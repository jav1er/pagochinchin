const dataStorage = {
  priceBTC: "",
  priceETH: "",
  priceDASH: "",
  usd_to_bs:1180127,
  setPriceBs(data) {
    this.usd_to_bs = data
  },
  getPriceBs() {
    return this.usd_to_bs
  },
  setPriceBtc(data) {
    this.priceBTC = data
  },
  getPriceBtc() {
    return this.priceBTC
  },
  setPriceEth(data) {
    this.priceETH = data
  },
  getPriceEth() {
    return this.priceETH
  },
  setPriceDash(data) {
    this.priceDASH = data
  },
  getPriceDash() {
    return this.priceDASH
  }
}


module.exports = dataStorage