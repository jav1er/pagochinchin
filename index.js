var app = require("./app")
var port = 3900
app.listen(port, _ => {
  console.log(`Servidor corriendo en http:localhost:${port}`)
})
