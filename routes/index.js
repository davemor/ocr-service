var express = require('express');
var router = express.Router();
var path = require('path');
var pdf_extract = require('pdf-extract');

/* GET form for uploading file by human */
router.get('/', function(req, res) {
  res.render('index', { title: 'OCR Service' });
});

var error = function(res, message, code) {
  res.render('error', {
    message: message,
    code: code
  });
}

var errorOCR = function(res, err) {
  console.log("Processing aborted due to error.")
  console.log(err);
  error(res, "OCR process failed with error: " + err, 500);
}

/* POST a pdf to process */
router.post('/', function(req, res) {
  var pdfFile = req.files.pdfFile;

  // do some error checking
  if(pdfFile == null) {
    error(res,"No file attached", 400);
  } else if (req.files.pdfFile.mimetype != 'application/pdf') {
    error(res, "Uploaded file is not pdf", 400);
  } else {
      // get the file logation
      var appDir = path.dirname(require.main.filename);
      var absolutePathToFile = path.resolve("./uploads/" + pdfFile.name);
      
      // logging
      console.log("PDF uploaded to " + absolutePathToFile);
      console.log("Starting to process ...");

      // run the ocr process
      var processor = pdf_extract(absolutePathToFile, {type:'ocr'}, function(err) {
        if(err) {
          errorOCR(res, err);
       } else {
          console.log("Processing exited without error.")
        }
      });
      processor.on('complete', function(data) {
        console.log("OCR complete.");
        console.log(data);
        success(req, res, data);
      });
      processor.on('error', function(err) {
        return errorOCR(res, err);
      });
  }
});

var success = function(req, res, data) {
  // respond based on content negotiation
  res.format({
    html: function() {
      res.render('text', {
        title: req.files.pdfFile.originalname,
        pages: data.text_pages
      })
    },
    json: function() {
      res.json( {
        hash: data.hash,
        text_pages: data.text_pages
      });
    }
  })
}

module.exports = router;