const axios = require("axios")

function getRequest (direction) {
  return new Promise((resolve, reject) => {
    axios
      .get(direction)
      .then(response => {
        console.log("respose success")
        resolve(response.data)
      })
      .catch(error => {
        console.log("!Ocurrio un error al momento de realizar la petición")
        resolve('')
      })
  })
}
module.exports = getRequest
