var path = require("path");
var express = require("express");
var app = express();

app.use(express.static(__dirname + "/"));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "index.html"));
});
app.listen(process.env.PORT || 8080);
