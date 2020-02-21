from config import app
from footfallModel import FootFall, FootFallSchema
from flask import jsonify, request
from flask import Blueprint
from config import db
import json

footFall_apis = Blueprint(
    'footFall_apis', __name__)  # this is to insert these api in the main app..

footFall_schema = FootFallSchema()
footFalls_schema = FootFallSchema(many=True)


#dangerous -- will delete this one, can hang the server
@app.route("/getAllfootFalls", methods=["GET"])
def get_footFalls():
    all_footFalls = FootFall.query.all()
    result = footFalls_schema.dump(all_footFalls)
    return jsonify(result)


@app.route("/getfootFallDetails/<footFallID>", methods=["GET"])
def get_footFall(footFallID):
    footFall = FootFall.query.get(footFallID)
    result = footFall_schema.dump(footFall)
    return jsonify(result)


@app.route("/addNewfootFall", methods=["POST"])
def add_footFall():
    MEMBER_ID = request.json['MEMBER_ID']
    GYM_ID = request.json['GYM_ID']
    FOOTFALL_TIMESTAMP = request.json['FOOTFALL_TIMESTAMP']
    ENTRY_EXIT = request.json['ENTRY_EXIT']
    X_COORD_FRAC = request.json['X_COORD_FRAC']
    Y_COORD_FRAC = request.json['Y_COORD_FRAC']
    #GYM_ID, GYM_NAME, AUTH_METHOD, PASSWD
    new_FootFall = FootFall(MEMBER_ID, GYM_ID, FOOTFALL_TIMESTAMP, ENTRY_EXIT,
                            X_COORD_FRAC, Y_COORD_FRAC)
    db.session.add(new_FootFall)
    db.session.commit()
    result = footFall_schema.dump(new_FootFall)
    return jsonify(result)


@app.route("/updatefootFall/<footFallID>", methods=["Post"])
def update_footFall(footFallID):
    MEMBER_ID = request.json['MEMBER_ID']
    GYM_ID = request.json['GYM_ID']
    FOOTFALL_TIMESTAMP = request.json['FOOTFALL_TIMESTAMP']
    ENTRY_EXIT = request.json['ENTRY_EXIT']
    X_COORD_FRAC = request.json['X_COORD_FRAC']
    Y_COORD_FRAC = request.json['Y_COORD_FRAC']
    footFall = FootFall.query.get(footFallID)
    footFall.MEMBER_ID = MEMBER_ID
    footFall.GYM_ID = GYM_ID
    footFall.FOOTFALL_TIMESTAMP = FOOTFALL_TIMESTAMP
    footFall.ENTRY_EXIT = ENTRY_EXIT
    footFall.X_COORD_FRAC = X_COORD_FRAC
    footFall.Y_COORD_FRAC = Y_COORD_FRAC
    db.session.commit()
    result = footFall_schema.dump(footFall)
    return jsonify(result)
