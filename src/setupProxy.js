const proxy = require("http-proxy-middleware")

module.exports = function(){
    app.use(
        proxy("/oauth/v1/generate?grant_type=client_credentials",{
            target:"https://sandbox.safaricom.co.ke",
            changeOrigin:true,
            router: {
                'http://localhost:3000': 'https://sandbox.safaricom.co.ke',
              },
        })
    )
}