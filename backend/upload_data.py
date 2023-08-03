import pymongo
import json

# Replace the connection string with your MongoDB Atlas connection string
# You can find the connection string in your MongoDB Atlas dashboard
connection_string = "mongodb+srv://the1ofmillion:<pass>@cluster0.2ql6f1e.mongodb.net/?retryWrites=true&w=majority"

# Replace 'database_name' with the name of your database and 'collection_name' with the name of your collection
database_name = "insurance_data"
collection_name = "insurance_rates"

# Function to read the JSON file and insert the data into MongoDB
def insert_json_data(file_path):
    client = pymongo.MongoClient(connection_string)
    db = client[database_name]
    collection = db[collection_name]

    with open(file_path, 'r') as file:
        data = json.load(file)
        collection.insert_many(data)

    client.close()

# Replace 'your_json_file.json' with the path to your JSON file
json_file_path = "rate_card.json"
insert_json_data(json_file_path)
