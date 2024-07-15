const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	const target =
		process.env.NODE_ENV === 'production'
			? 'http://yu-mern-rtk.com'
			: 'http://localhost:5000';

	app.use(
		['/api', '/auth/google', '/car'],
		createProxyMiddleware({
			target: target,
		})
	);
};
