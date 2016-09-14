// Karma configuration
// Generated on Mon Sep 12 2016 15:35:05 GMT+0800 (CST)

// Karma configuration
function getLocalIP() {
	var ifaces = require('os').networkInterfaces();
	for (var dev in ifaces) {
		var iface = ifaces[dev];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				return alias.address;
			}
		}
	}
}

function createWebdriver(extraConfig) {
	return Object.assign({
		'name': 'Karma',
		'base': 'WebDriver',
		'config': {
			'host': 'f2etest.alibaba-inc.com',
			'port': 4444
		},
		// f2etest获取账号和apiey
		'f2etest.userid': '',
		'f2etest.apiKey': '',
		'pseudoActivityInterval': 30000
	}, extraConfig);
}

module.exports = function (config) {
	config.set({
		basePath: './',

		// Browser support Same as Chai.js: IE 9+, Chrome 7+, FireFox 4+, Safari 5+ except should style that is currently not compatible with IE 9.
		// Consider karma-expect, if you need run tests in IE8 and lower.
		frameworks: ['mocha', 'chai', 'commonjs'],

		files: [
			'src/**/*.js',
			'test/**/*.js'
		],

		exclude: [
			'karma.conf.js'
		],

		preprocessors: {
			'src/**/*.js': ['commonjs', 'coverage'],
			'test/**/*.js': ['commonjs']
		},

		reporters: ['progress', 'mocha', 'coverage'],

		port: 9876,

		colors: true,

		logLevel: config.LOG_INFO,

		autoWatch: false,

		//browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS', 'Opera', 'IE'],
		browsers: ['PhantomJS'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		plugins: [
			'karma-mocha',
			'karma-chai',
			'karma-coverage',
			'karma-mocha-reporter',
			'karma-phantomjs-launcher',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-safari-launcher',
			'karma-safari-launcher',
			'karma-ie-launcher',
			'karma-commonjs',
			'karma-webdriver-launcher'
			//'karma-babel-preprocessor',
		],

		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		},

		//默认hostname是localhost，这个host在本地运行测试没问题
		//但是远端浏览器无法访问，所以需要在此处配置一个f2etest的浏览器
		hostname: getLocalIP(),

		customLaunchers: {
			'f2etest-chrome': createWebdriver({browserName: 'chrome'}),
			'f2etest-firefox': createWebdriver({browserName: 'firefox'}),
			'f2etest-ie8': createWebdriver({browserName: 'internet explorer', version: '8'}),
			'f2etest-ie9': createWebdriver({browserName: 'internet explorer', version: '9'}),
			'f2etest-ie10': createWebdriver({browserName: 'internet explorer', version: '10'}),
			'f2etest-ie11': createWebdriver({browserName: 'internet explorer', version: '11'})
		}
	})
}
