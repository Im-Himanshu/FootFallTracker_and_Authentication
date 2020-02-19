from flask import Flask, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os
# this file not to be touched again just the app variable has to accessed in all the Model and api File.
app = Flask(__name__)
CORS(app)  # for adding the cross-origin headear to handle request from angular
basedir = os.path.abspath(os.path.dirname(__file__))
app.config[
    'SQLALCHEMY_DATABASE_URI'] = "mysql://root:admin#123@localhost:3308/footfalltrackerboot"
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

#db.create_all()


#api common response templates
def resultWithStatusCode(result, status, message):
    response = app.response_class(response=json.dumps(result),
                                  status=200,
                                  mimetype='application/json')
    return response
