import Axios from 'axios';

var config = require('../config.json');
config = config[config.env];

var API_ENDPOINT = config.api_endpoint;
console.log('API_ENDPOINT', API_ENDPOINT);

var parseUrl = (function () {
  var a = document.createElement('a');
  return function (url) {
    a.href = url;
    return {
      host: a.host,
      hostname: a.hostname,
      pathname: a.pathname,
      port: a.port,
      protocol: a.protocol,
      search: a.search,
      hash: a.hash
    };
  }
})();

var Service = {
  processLink: function(link){
    link = parseUrl(link);

    return Axios.post(
      API_ENDPOINT + "/work",
      {
        protocol: link.protocol + '//',
        url: link.host + link.pathname + link.search + link.hash
      })
      .then(function(response){
        return response.data
      });
  }
}

module.exports = Service;
