#!/usr/bin/env node

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var chalk = require('chalk');

function postRequest(url, callback)
{
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://w3z.in/work');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
    }
    
    var protocol = "http://";
    if(url.indexOf("https://") > -1){
      protocol = "https://";
    }
    if(url.indexOf("http://") > -1){
      protocol = "http://";
    }
    myData = {
      protocol: protocol,
      url: url.replace("https://", "").replace("http://", "")
    }
    // console.log(JSON.stringify(myData));
    xhr.send(JSON.stringify(myData));
}

var program = require('commander');

program
.arguments('<url>')
.action(function(url) {
  postRequest(url, function(data){
    data = JSON.parse(data);
    console.log(chalk.green(data.u));
  });
})
.parse(process.argv);