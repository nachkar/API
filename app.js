// Include required libs
var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var path = require("path");
var fs = require("fs");
var upload_video = require("./video_upload.js");

app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({ extended: false }));

// Video POST handler.
app.post("/video_upload", function (req, res) {
  upload_video(req, function(err, data) {
    console.log("upload video handler called");

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }

    res.send(data);
  });
});

// Create folder for uploading files.
var filesDir = path.join(path.dirname(require.main.filename), "uploads");

if (!fs.existsSync(filesDir)){
  fs.mkdirSync(filesDir);
}

// Init server.
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});