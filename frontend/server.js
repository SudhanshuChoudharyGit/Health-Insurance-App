const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://127.0.0.1:5000/', // Original URL of your backend
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
  })
);

const PORT = 3001; // You can choose any available port number
app.listen(PORT, () => {
  console.log(`Middleware server running on port ${PORT}`);
});
