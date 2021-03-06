// equivalent of older: const express = require('express')
import * as express from 'express';
// import { routes } from 'routes';
import { routes } from './routes'; 
import * as path from 'path';
const { Storage } = require('@google-cloud/storage');

const app = express();
// Allow any method from any host and log requests
app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
})
// Handle POST requests that come in formatted as JSON
app.use(express.json());
// make express look in the public directory for assets (css/js/img)
// app.use(express.static(__dirname + '/dist/artGenerator'));

// app.get('/*', function(req, res) {
//     res.sendFile(path.join('dist/artGenerator/index.html'));
//   });

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname + '/dist/artGenerator/index.html'));
// });
// A default hello word route
// Put at the top
// Put after the express.json() call
app.use(express.static(__dirname + '/dist/artGenerator'))


// app.use('/', routes);

app.get('/artImages', function (req, res) {
    const storage = new Storage(
      {
        "keyFilename": "artGenerator-c7aeb7e6db05.json",
        "project_id": "artgenerator-8008a",
      }
  
    );
  
    // res.send({hello: 'world'});
    const options = {
      prefix: 'artImages/'
    };
    let artImagesBucket = storage.bucket('artgenerator-8008a.appspot.com');
    artImagesBucket.getFiles(options).catch((err) => {
      console.log('found error', err);
    }).then((response) => {
      if (response) {
        res.send(response[0]);
      }
    })
  
    //  .subscribe(function (res: any) {
    // console.log('res', res); 
    // });
    // artImagesBucket.getFiles(function (err: any, files: any) {
    //   if(!err) {
    //   files.forEach(function (file) {
    //     file.getDownloadURL().then((url) => {
    //       if (url) {
    //         console.log('url', url);
    //         patternImages.push(url);
    //       }
    //     }).catch(function (error) {
    //     });
    //   }
    //   )
    // } else {
    //   console.log('error', err);
    // }
    // })
    // res.send('patternImages')
  })
  
// start our server on port 4201
var port = process.env.PORT || 4201;
app.listen(port);