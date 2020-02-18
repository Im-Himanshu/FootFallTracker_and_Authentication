from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
# this file not to be touched again just the app variable has to accessed in all the Model and api File.
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config[
    'SQLALCHEMY_DATABASE_URI'] = "mysql://sql12323255:c61Gu8jKBL@sql12.freemysqlhosting.net:3306/sql12323255"
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
db.create_all()
