const express = require("express");
const compression = require('compression');
const path = require('path');
const app = express();
require('zone.js/dist/zone-node');
const fs = require('fs');
let AppServerModuleNgFactory = null;
fs.readdir('../dist-server', (err, files) => {
 AppServerModuleNgFactory = require('../dist-server/' + files[1]).AppServerModuleNgFactory;
})

const renderModuleFactory = require('@angular/platform-server').renderModuleFactory;
// const AppServerModuleNgFactory = require('../dist-server/main.62687d37412385d84bce.bundle.js').AppServerModuleNgFactory;
const index = require('fs').readFileSync('../src/index.html','utf8');

app.use(compression());
app.use(express.static(path.join(__dirname, '../dist-server')));

app.get('/', (req, res) => {
  renderModuleFactory(AppServerModuleNgFactory, {document: index, url: '/'}).then(html => {
    res.send(html).end();
  });

});

var port = '8090';
app.listen(port, function() {
  console.log("Listening on " + port);
});
