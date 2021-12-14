//Purpose of file is to collect the endpoints and prefixes them; this collects the packaged group of API endpoints and prefixes them with the path "./api"

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;