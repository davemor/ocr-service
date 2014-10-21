ocr-service
===========

A simple web service for converting PDFs that contain photos of documents into text.

Installation
============
The service has quite a number of dependencies.  Use nmp to install the required node modules.
```
npm install
```

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