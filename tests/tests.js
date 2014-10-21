// very basic test for the services API
// send a POST request with a test PDF
// to run the test use "node tests.js:
// while the service is running on port
var unirest = require('unirest');
var path = require('path');
var uri = 'http://localhost:3000/';

var attachmentPath = path.join(__dirname, 'scansmpl.pdf');
console.log(attachmentPath)

// test the json interface
unirest.post(uri)
  .header({'Accept':'application/json'})
  .attach('pdfFile', attachmentPath)
  .end(function(res) {
    console.log(res.body);

    var correctValue = {
       "hash":"007107b54720d58a567a9eb23fefef5cd82dfcdd",
       "text_pages":[
          ". SAPORS LANE - BUGLE - DORSET - BHZS BER\nTELEPHONE Boots (94513) 51617 - TELEX 123456\n\nOur Ref. BSD/PJC/EAC 18th January, 1972.\nDr. P.N. Cundall,\nMining Surveys Ltd.,\nHolroyd Road,\nReading,\nBerks.\nDear Pete,\n\nPermit me to introduce you to the facility of facsinﬁle\ntransmission.\n\nIn facsimile a photocell is caused to perform a raster scan over\n\n* the Subject copy. The variations of print density on the document\n-cause the photocell to generate an analogous electrical video signal.\nThis signal is used to modulate a carrier, which is transmitted to a\nremote destination over a radio or cable communications link.\n\nAt the remote terminal, demodulation reconstructs the video\nsignal, which is used to modulate the density of print produced by a\nprinting device. This device is scanning in a raster scan synchronised\nwith that at the transmitting terminal. As a result, a facsimile\ncopy of the subject document is produced.\n\nProbably you have uses for this facility in your organisation.\n\nYours sincerely,\nP.J. CROSS\nGroup Leader - Facsimile Research\nRegistered in England: No. EDSB\nNil 1 Registered foiee: BO Vicar: Lane, Ili'ord. Ellel.\n\n"
       ]
    };

    if(correctValue.hash == res.body.hash &&
       correctValue.text_pages == correctValue.text_pages) {
      console.log("Test passed");
    } else {
      console.log("Test failed");
    }
  });