from flask import Flask, request, jsonify
import pymongo
from flask_cors import CORS 

# Create the Flask app
app = Flask(__name__)
CORS(app)

# Replace the connection string with your MongoDB Atlas connection string
# You can find the connection string in your MongoDB Atlas dashboard
connection_string = "mongodb+srv://the1ofmillion:KOIg2wNiDufSP6oU@cluster0.2ql6f1e.mongodb.net/?retryWrites=true&w=majority"

# Replace 'database_name' with the name of your database and 'collection_name' with the name of your collection
database_name = "insurance_data"
collection_name = "insurance_rates"

# Function to perform the query and return the results as JSON
def calculate_individual_premium(age, cover, city, tenure):
    print("this function got called!")
    client = pymongo.MongoClient(connection_string)
    db = client[database_name]
    collection = db[collection_name]

        # Prepare the query filter to find the document with the specified criteria
    query_filter = {
        "Age": str(age),
        "SumInsured": str(cover),
        "Tenure": str(tenure),
        "TierID": str(city)
    }

    # Perform the query using find_one method with the query_filter
    query_result = collection.find_one(query_filter)

    # If the document is found, return the "Rate" value
    if query_result:
        rate = float(query_result.get("Rate"))
        client.close()
        return rate
    else:
        client.close()
        return None

# API endpoint for handling the query
@app.route('/api/calculate_premium', methods=['POST'])
def query_data():
    print("got the request")
    data = request.get_json()  # Assuming the request contains the query filter in JSON format

    ages = data['ages']
    city = data['city']
    cover = data['cover']
    tenure = data['tenure']

    if not data:
        return jsonify({"error": "Invalid request"}), 400
    
    premium = float(0)

    for age in ages:
        member_premium = float(calculate_individual_premium(age, cover, city, tenure))
        print("before dicount: "+str(float(member_premium)))
        if age != max(ages):
            member_premium *= 0.5
        print("after dicount: "+str(float(member_premium)))
        premium += member_premium

    return jsonify({'premium': premium})

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app in debug mode
