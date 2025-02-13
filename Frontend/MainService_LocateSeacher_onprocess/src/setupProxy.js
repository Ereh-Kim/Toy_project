const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  
  app.use(
    createProxyMiddleware(['/maps/api/place/findplacefromtext/json','/maps/api/place/photo'],{
      target: 'https://maps.googleapis.com',
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware([`/v1/places/:NAME/photos/:PHOTOS/media`,'/v1/places:searchNearby'],{
      target: 'https://places.googleapis.com',
      changeOrigin: true
    })
  );  

  app.use(
    createProxyMiddleware([`/login_check`,`/update`,`/delete`],{
      target: 'http://localhost:8080',
      changeOrigin: true
    })
  );

  app.use(
    ['/usercreation/**','/imagedata/**'],
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true
    })
  );

};