# Health-Insurance-App
A python app based on flask for calculating Health Insurance premium using MongoDB for Database and React for frontend.

Node - Proxy server (server.js) file is used to deal with CORS policy (Would not be needed if frontend and backend are deployed on same domain)

# APIs and URLs with Sample Input and Output

## Backend APIs:

1. **Endpoint**: `/api/calculate_premium`
   - **Method**: POST
   - **Description**: Calculates the premium for a health insurance plan based on user inputs such as age, city tier, sum insured, and tenure.
   - **Sample Input**:
     ```json
     {
       "ages": [30, 35],
       "city": "1",
       "cover": "500000",
       "tenure": "2"
     }
     ```
   - **Sample Output**:
     ```json
     {
       "premium": 4500
     }
     ```
   - **Explanation**: In this example, the user selected two adults with ages 30 and 35, City Tier 1, Sum Insured of 5,00,000, and Tenure of 2 years. The backend returns the calculated premium, which is 4500.

## Frontend:

1. **Component**: `Form`
   - **Description**: Provides a form for user input to select adults' ages, city tier, sum insured, and tenure.
   - **User Inputs**:
     - Number of Adults
     - Ages for each Adult
     - City Tier
     - Sum Insured
     - Tenure
   - **Example**:
     ```
     Adults: 2
     Ages: 30, 35
     City Tier: Tier 1
     Sum Insured: 5,00,000
     Tenure: 2 years
     ```
   - **Output**: Displays the calculated premium based on user inputs.

2. **Component**: `PaymentPage`
   - **Description**: Displays the Premium Amount received as a query parameter and handles payment processing.
   - **Example**:
     ```
     Premium Amount: 4500
     ```

# Installation Guide - Backend and Frontend:

1. Clone the  Repository:

  ```
    git clone <repository-url>
    cd <directory>
  ```
2. Install Dependencies for frontend:
  ```
    cd frontend
    npm install
  ```
2. Install Dependencies for backend:
  ```
    cd backend
    pip3 install -r requirements.txt
  ```
3. Setup MongoDB Atlas:
- Replace `<pass>` in `connection_string` in `app.js` with the MongoDB Atlas password.

4. Start the Backend Server:
  ```
    cd backend
    python3 app.py
  ```

6. Provide the backend server URL in place of Original URL of your backend server in server.js file
  ```
app.use(
  '/api', 
  createProxyMiddleware({
    target: 'http://127.0.0.1:5000/', // Original URL of your backend server <--------------- HERE
    changeOrigin: true, 
    onProxyRes: function (proxyRes, req, res) {
      // Set 'Access-Control-Allow-Origin' header to allow cross-origin requests from any origin
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
  })
);
```

8.  Start the proxy Server:
  ```
    cd frontend
    node server.js
  ```
8. Start the frontend React app:
  ```
    cd frontend
    npm start
  ```
9.  Frontend is now accessible at the `http://localhost:3000/`

**Note**: Ensure that the backend server is running and accessible from the frontend URL for the full application to work correctly.


