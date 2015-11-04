require('dotenv').config({path: (process.env.NODE_ENV || 'development') + '.env'});
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('./src/scripts');
require('app-module-path').addPath('./src');

require("babel/register")({
	stage: 0,
	plugins: ["typecheck"]
});

global.__CLIENT__ = false;
global.__SERVER__ = true;

require('./webpack-isomorphic-tools-main')(function() {
  require('./server.js')();
});
