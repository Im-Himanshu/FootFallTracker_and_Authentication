from config import app
from gymsModel import GymsSchema
from gymsModel import Gyms
from flask import jsonify, request
from flask import Blueprint
from config import db

gyms_apis = Blueprint(
    'gyms_apis', __name__)  # this is to insert these api in the main app..

gym_schema = GymsSchema()
gyms_schema = GymsSchema(many=True)


@app.route("/getAllGyms", methods=["GET"])
def get_gyms():
    all_gyms = Gyms.query.all()
    result = gyms_schema.dump(all_gyms)
    return jsonify(result)


@app.route("/getGymDetails/<id>", methods=["GET"])
def get_gym(id):
    gym = Gyms.query.get(id)
    result = gym_schema.dump(gym)
    return jsonify(result)


@app.route("/addNewGym", methods=["POST"])
def add_gym():
    GYM_ID = request.json['GYM_ID']
    GYM_NAME = request.json['GYM_NAME']
    AUTH_METHOD = request.json['AUTH_METHOD']
    PASSWD = request.json['PASSWD']
    #GYM_ID, GYM_NAME, AUTH_METHOD, PASSWD
    new_gym = Gyms(GYM_ID, GYM_NAME, AUTH_METHOD, PASSWD)
    db.session.add(new_gym)
    db.session.commit()
    result = gym_schema.dump(new_gym)
    return jsonify(result)


@app.route("/updateGym/<id>", methods=["Post"])
def update_gym(id):
    GYM_ID = request.json['GYM_ID']
    GYM_NAME = request.json['GYM_NAME']
    AUTH_METHOD = request.json['AUTH_METHOD']
    PASSWD = request.json['PASSWD']
    gym = Gyms.query.get(id)
    gym.GYM_ID = GYM_ID
    gym.GYM_NAME = GYM_NAME
    gym.AUTH_METHOD = AUTH_METHOD
    gym.PASSWD = PASSWD
    db.session.commit()
    result = gym_schema.dump(gym)
    return jsonify(result)
