const dataStorage = require("./dataStorage");


function setBs(req, res) {
 let precio = req.params.precio

 console.log('en set bs');
 console.log(precio)
 dataStorage.setPriceBs(precio)


 return res.status(200).send({
  status: "success",
  msg: "precio registrado",
  priceBS:dataStorage.getPriceBs()
 })


}



module.exports = setBs