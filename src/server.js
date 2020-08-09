const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');

const { pageGiveClasses, pageLanding, pageStudy, saveClasses } = require('./pages');

const server = express();

// Template engine
nunjucks.configure('src/pages', {
  express: server,
  noCache: true,
});

// Configure static files
server.use(express.static('public'));
// Configure to parse body requests with URL Encoded (POST method)
server.use(express.urlencoded({ extended: true }));

// Application routes
server.get('/', pageLanding);
server.get('/study', pageStudy);
server.get('/give-classes', pageGiveClasses);
server.post('/save-classes', saveClasses);

server.listen(5500);
