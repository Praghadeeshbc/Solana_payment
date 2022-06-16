const http = require('http');
const express = require('express');
const app = new express();

var fs =  require('fs');

http.createServer(function(req,res){
    fs.readFile('index6.html',function(err,data){
        res.writeHead(200,{'Content-type': 'text/html','Content-length':data.length})
        res.write(data);
        res.end();
    })
}).listen(7000)