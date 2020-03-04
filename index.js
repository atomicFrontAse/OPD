var fs = require('fs')
var conversion = require("phantom-html-to-pdf")();
var express = require('express');
var cors = require('cors');
const utf8 = require('utf8');

const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors());

app.post('/getPdf', function (req, res) {
    conversion({ 
        paperSize: {
            format: 'A4',
            orientation: 'landscape'
        },
        html: `
            <html>
            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
            </head>
            <body>
                ${req.body.opd}
            </body>
            </html>
        `
    }, function(err, pdf) {
        var output = fs.createWriteStream('./output.pdf')
        pdf.stream.pipe(output);
      res.setHeader('content-type', 'application/pdf');
      pdf.stream.pipe(res);
    });


  
});

app.listen(4001, '10.173.108.26', function () {
});