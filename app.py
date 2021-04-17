from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
import pymongo
from bson.json_util import dumps, loads
# Dictionary of Justice League
# justice_league_members = [
#     {"superhero": "Aquaman", "real_name": "Arthur Curry"},
#     {"superhero": "Batman", "real_name": "Bruce Wayne"},
#     {"superhero": "Cyborg", "real_name": "Victor Stone"},
#     {"superhero": "Flash", "real_name": "Barry Allen"},
#     {"superhero": "Green Lantern", "real_name": "Hal Jordan"},
#     {"superhero": "Superman", "real_name": "Clark Kent/Kal-El"},
#     {"superhero": "Wonder Woman", "real_name": "Princess Diana"}
# ]
app = Flask(__name__)

# @TODO: setup mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_db"
# mongo = PyMongo(app)
conn = 'mongodb://localhost:27017'
client=pymongo.MongoClient(conn)

# @TODO: connect to mongo db and collection
nhl_db=client.nhl_db


@app.route('/')
def index():

    # populate the page with initial data (all data?)
    # map_data = mongo.db.map_collection.find_one()
    # return render_template("index.html", map_stuff=map_data)

    # test with nhl db
    nhl_data = nhl_db.articles.find_one()
    # print(mars_data['_id'])
    print(nhl_data)

    return render_template("index.html", nhl_dict=nhl_data)


# when interaction takes place, JS is directed to this enpoint, and the data function takes place
@app.route('/data')
def data():
    # store the entire article collection in a list
    articles = list(nhl_db.articles.find())
    # jsonify does not think articles is a serializable object, so we must create a new list that will be able to be passed through jsonify

    articles_new=[{'header': article['header'], 'subheader':article['subheader'], 'date':article['date']} for article in articles]
    print(articles_new)
    return jsonify(articles_new)
    
    
    # create our session (link) from Python to the DB??
    # pymongo.db.collection.find() returns a cursor object -> not the same as a list, so you must convert to list

    

    # Return a list of the data and save as a variable(in js, you have ensured that whatever is returned is saved as a variable within the js)

    # this is saved as a variable in JS  because of the way you named it:
    # const university_url="/data"
    # then, when the person interacts with this, they are directed to the endpoint?

if __name__ == "__main__":
    app.run(debug=True)