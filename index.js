const polka = require('polka');
const maxmind = require('maxmind');
const path = require('path');

const geodb = maxmind.openSync(path.resolve('GeoLite2-City.mmdb'));

const rootRoute = (req, res) => {
  res.end(JSON.stringify(geodb.get(req.connection.remoteAddress)))
};

const ipRoute = (req, res) => {
  res.end(JSON.stringify(geodb.get(req.params.ip)))
};

polka()
  .get('/', rootRoute)
  .get('/ip/:ip', ipRoute)
  .listen(3000);
