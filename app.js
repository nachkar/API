// Include required libs
var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var path = require("path");
var fs = require("fs");
var multer  = require('multer');

app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({ extended: false }));

var upload = multer({ dest: '/tmp/'});

// File input field name is simply 'file'
app.post('/file_upload', upload.single("file"), function (req, res) {
    var file = __dirname + "/uploads/" + req.file.originalname;
    fs.readFile( req.file.path, function (err, data) {
         fs.writeFile(file, data, function (err) {
          if( err ){
               console.error( err );
               response = {
                    message: 'Sorry, file couldn\'t be uploaded.',
                    filename: req.file.originalname
               };
          }else{
                response = {
                    message: 'File uploaded successfully',
                    filename: req.file.originalname
               };
           }
           res.end( JSON.stringify( response ) );
        });
    });
 })
 

// Create folder for uploading files.
var filesDir = path.join(path.dirname(require.main.filename), "uploads");

if (!fs.existsSync(filesDir)){
  fs.mkdirSync(filesDir);
}

// Init server.
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});