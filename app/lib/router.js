
'use strict';

const express     = require('express'),
      browserify  = require('browserify'),
      config      = require('../config/config.js'),
      log         = require('../bin/log.js');

const router      = express.Router();



// Log requests

router.get('*', (req, res, next) => {
    log.info(`${req.method} ${req.url}`);
    next();
});



// Set up routes
// Default route

router.get('/', (req, res) => {
    res.status(200).render('../client/views/index.hbs');
});



// Application

router.get('/bundle.js', function (req, res) {
    browserify([__dirname+'/../client/app.js'], {
        debug: true
    })
    .bundle()
    .pipe(res);
});



// Health check

router.get('/ping', (req, res) => {
    res.status(200).send('OK ' + config.get('version'));
});



// Static files

router.use(express.static(config.get('docRoot')));



// Export application

module.exports = router;
