from flask import Flask, request, jsonify
import pymongo
from flask_cors import CORS

# Creating the Flask app and enable Cross-Origin Resource Sharing (CORS)
app = Flask(__name__)
CORS(app)

# Connection string with MongoDB Atlas connection string
connection_string = "mongodb+srv://the1ofmillion:<pass>@cluster0.2ql6f1e.mongodb.net/?retryWrites=true&w=majority"


database_name = "insurance_data"
collection_name = "insurance_rates"

# Function to calculate the individual premium based on age, cover, city, and tenure
def calculate_individual_premium(age, cover, city, tenure):
    # Connection to the MongoDB using the provided connection string.
    client = pymongo.MongoClient(connection_string)
    db = client[database_name]
    collection = db[collection_name]

    # Query filter to find the document with the specified criteria.
    query_filter = {
        "Age": str(age),
        "SumInsured": str(cover),
        "Tenure": str(tenure),
        "TierID": str(city)
    }

    # Performs the query 
    query_result = collection.find_one(query_filter)

    # If the document is found, extract the "Rate" value and return it as a floating-point number.
    if query_result:
        rate = float(query_result.get("Rate"))
        client.close()
        return rate
    else:
        client.close()
        return None

# API endpoint for handling the query to calculate premium
@app.route('/api/calculate_premium', methods=['POST'])
def query_data():
    # Retrieve the JSON data from the POST request containing ages, city, cover, and tenure.
    data = request.get_json()

    # Ensure that the request contains valid data; otherwise, return an error response with 400 status code.
    if not data or 'ages' not in data or 'city' not in data or 'cover' not in data or 'tenure' not in data:
        return jsonify({"error": "Invalid request"}), 400

    # Initialize the total premium variable.
    premium = float(0)

    # Calculate individual premiums for each age provided in the request and accumulate the total premium.
    if len(data['ages']) == 1:
        age1 = data['ages'][0]
        premium = float(calculate_individual_premium(age1, data['cover'], data['city'], data['tenure']))
    else :
        for age in data['ages']:
            member_premium = float(calculate_individual_premium(age, data['cover'], data['city'], data['tenure']))

            # Apply a discount of 50% to all member premiums except the oldest age in the list.
            if age != max(data['ages']):
                member_premium *= 0.5

            # Add the calculated premium to the total premium.
            premium += member_premium

    # Return the total premium as a JSON response.
    return jsonify({'premium': premium})

# Main entry point of the application
if __name__ == '__main__':
    # Run the Flask app on the default host and port.
    app.run()
