from flask import Flask, render_template, jsonify
import pymongo
import json
from bson import ObjectId

app = Flask(__name__)

# setup mongo connection
conn = 'mongodb://localhost:27017'
client=pymongo.MongoClient(conn)

# use client to connect to the overseas database
db=client.overseas_db

@app.route('/')
def index():
    # get data from country_test collection
    country_data = db.country_test.find_one()
    # print(country_data)
    print ('home route')

    # render the country data using the index.html template
    return render_template("index.html", country_dict=country_data)
    # js is in the index.html. js will read resource data 


# when interaction takes place, JS is directed to this endpoint, and the data function takes place
@app.route('/data')
def data():
    
    # query the countries database, do not return the ObjectID from Mongo
    countries = db.country_test.find_one({}, {'_id': False})
    # print('data page')

    # return json version of the database
    return jsonify(countries)
    # this returned data is saved in JS as a variable, which can then be used to create visuals. 

if __name__ == "__main__":
    app.run(debug=True)