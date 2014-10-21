ocr-service
===========

A simple web service for converting PDFs that contain photos of documents into text.  The service is built on node.js using the express.js framework.  Created for [Code the City 2](http://codethecity.org/).

Installation
============
The service uses the node module [pdf-extract](https://www.npmjs.org/package/pdf-extract) to interface with the ocr software [Tesseract](http://en.wikipedia.org/wiki/Tesseract_%28software%29) and other pdf processing tools.  Thus it has quite a few dependencies.

Under Ubuntu 14.04 the instructions are as follows.  Note that for the express.js start up script to work you need to be running the legacy node installation so we will install that first.
```
apt-get install nodejs-legacy
apt-get install pdftk
apt-get install poppler-utils
apt-get install ghostscript
apt-get install tesseract-ocr
```
You may need to run these as root or sudo.
Next clone this repository and cd into the dictory
```
git clone https://github.com/davemor/ocr-service.git
cd ocr-service
```
One the dependencies are installed use nmp to install the required node modules.
```
npm install
```
I'm working on a Docker file that will allow for easy deployment of the app. 
Running
=======
In the root directory of the app, type 
```
npm start
```
Usage
=====
By default the service runs on port 3000.  To submit a PDF file to the service make a POST request to '/' with a file attached called 'pdfFile'.

There is also a webform for submitting a document manually.  It can be retrived by making a get request to '/'.  If you are running the service locally just point your browser at localhost:3000.
