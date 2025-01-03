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
      changeOrigin: true,
      // pathRewrite: (path, req)=>{
      //   const NAME = req.params.NAME
      //   const New_Path = path.replace('')
      // }
    })
  );  

  app.use(
    createProxyMiddleware([`/login_check`,`/update`,`/delete`,`/login/google`],{
      target: 'http://localhost:8080',
      changeOrigin: true
    })
  );

};