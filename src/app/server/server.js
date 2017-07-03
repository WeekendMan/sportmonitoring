"use strict";

function start(error, stdout, stderr) {
  if(error) {
    console.error(error, stderr);
    return false;
  }

  console.info(`${new Date()} | Dependencies are satisfied`.green);

  const express = require('express');
  const colors = require('colors');
  const app = express();
  const domain = 'http://178.159.110.25';
  let port = 80;

  // Routes
  app.use(express.static(`${__dirname}/public`));

  app.all('/api/:link', (req, res) => {
    console.info(`${new Date()} | request to ${domain}:5000/api${req.params.link}`.cyan);
    res.redirect(302, process.argv + req.params.link);
  });

  app.get('*', (req, res) => {
    console.info(`${new Date()} | page request by URL ${req.protocol}://${req.get('Host')}${req.url}`.cyan);
    res.sendFile(`${__dirname}/public/index.html`);
  });

  // Starting the server
  app.listen(port, () => {
    console.log(`${new Date()} | application is running on the ${port} port`.cyan);
  })
}

//Checking 2 dependencies of the backend script
let exec = require('child_process').exec;

try {
  console.info(`${new Date()} | checking the dependencies, please, wait, it can take a while ...`);
  require.resolve('express');
  require.resolve('colors');
  start();
} catch(e) {
  console.warn(`${new Date()} | missing dependencies, installing ...`.yellow);
  exec('npm install', start);
}
