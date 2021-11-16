// var path = require("path");
// var express = require("express");
// var app = express();
// app.use(express.static(__dirname + "/"));
// app.listen(process.env.PORT || 8080);
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join("build", "index.html"));
//   });
// }

app.use(express.static(path.join(__dirname, "/../dist")));
app.use("/data", express.static(__dirname + "/data"));
app.use(express.static(__dirname));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../dist/index.html"));
});