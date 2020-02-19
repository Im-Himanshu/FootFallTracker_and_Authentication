from config import app
from gymMembersModel import GymMember, GymMemberSchema
from flask import jsonify, request
from flask import Blueprint
from flask_api import status
from config import db
import config
import json

gymMember_apis = Blueprint(
    'gymMember_apis',
    __name__)  # this is to insert these api in the main app..

gymMember_schema = GymMemberSchema()
gymMembers_schema = GymMemberSchema(many=True)


@app.route("/getAllGymMember", methods=["GET"])
def get_gymMembers():
    all_GymMember = GymMember.query.all()
    result = gymMembers_schema.dump(all_GymMember)
    return jsonify(result)


@app.route("/getGymMemberDetails/<id>", methods=["GET"])
def get_gymMember(id):
    gymMember = GymMember.query.get(id)
    result = gymMember_schema.dump(gymMember)
    return jsonify(result)


@app.route("/addNewGymMember", methods=["POST"])
def add_gymMember():
    MEMBER_ID = request.json['MEMBER_ID']
    MEMBER_NAME = request.json['MEMBER_NAME']
    GYM_ID = request.json['GYM_ID']
    ENCODINGS = request.json['ENCODINGS']
    #ENCODINGS = json.dumps(ENCODINGS)
    # will convert json to string for persisting with None to null
    #GYM_ID, GYM_NAME, AUTH_METHOD, PASSWD
    new_GymMember = GymMember(MEMBER_ID, MEMBER_NAME, GYM_ID, ENCODINGS)
    db.session.add(new_GymMember)
    db.session.commit()
    result = gymMember_schema.dump(new_GymMember)
    return jsonify(result)


@app.route("/updateGymMember/<memberId>", methods=["Post"])
def update_gymMember(memberId):
    MEMBER_ID = request.json['MEMBER_ID']
    MEMBER_NAME = request.json['MEMBER_NAME']
    GYM_ID = request.json['GYM_ID']
    ENCODINGS = request.json['ENCODINGS']
    gymMember = GymMember.query.get(memberId)
    gymMember.MEMBER_ID = MEMBER_ID
    gymMember.MEMBER_NAME = MEMBER_NAME
    gymMember.GYM_ID = GYM_ID
    gymMember.ENCODINGS = ENCODINGS
    db.session.commit()
    result = gymMember_schema.dump(gymMember)
    return jsonify(result)