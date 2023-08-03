
const express = require('express'); 
const cors = require('cors'); 
const { createProxyMiddleware } = require('http-proxy-middleware'); // Importing middleware to create a proxy

// Create an instance of the Express app
const app = express();

// Enable CORS to allow cross-origin requests
app.use(cors());

// Creating a proxy middleware to redirect requests from '/api' to the backend server
app.use(
  '/api', 
  createProxyMiddleware({
    target: 'http://127.0.0.1:5000/', // Original URL of your backend server
    changeOrigin: true, 
    onProxyRes: function (proxyRes, req, res) {
      // Set 'Access-Control-Allow-Origin' header to allow cross-origin requests from any origin
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
  })
);

// Defining the port on which the middleware server will listen
const PORT = 3001;

// Starting the Express server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Middleware server running on port ${PORT}`);
});
