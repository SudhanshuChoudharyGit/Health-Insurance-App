import csv
import json

csv_file = 'rate_card_data.csv'
json_file = 'rate_card.json'

with open(csv_file, 'r') as file:
    csv_data = csv.DictReader(file)
    json_data = [dict(row) for row in csv_data]

with open(json_file, 'w') as file:
    file.write(json.dumps(json_data))
