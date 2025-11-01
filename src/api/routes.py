"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException, valid_email
from flask_cors import CORS
import os
from base64 import b64encode
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    
    data = request.get_json()

    email = data.get("email").strip()
    lastname = data.get("lastname")
    password = data.get("password").strip()
    is_active = True

    if not email or not lastname or not password:
        return jsonify({"message" : "You need to introduce Email, lastname and password."}), 400
    
    if not valid_email(email):
        return jsonify({"message": "The email format is invalid. correct: example@gmail.com"})

    

    user_exist = User.query.filter_by(email=email).first()

    if user_exist:
        return jsonify("This user already exist."), 409
    
    salt = b64encode(os.urandom(32)).decode("utf-8")
    password = generate_password_hash(f"{password}{salt}")
    
    new_user = User(
        email=email,
        lastname=lastname,
        password=password,
        is_active=is_active,
        salt=salt
    )

    db.session.add(new_user)

    try:
        db.session.commit()
        return jsonify("Usuario agregado correctamente.")
    except Exception as error:
        db.session.rollback()
        return jsonify({"message" : f"Error: {error}"})
    
@api.route('/login', methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email").strip()
    password = data.get("password").strip()

    if not email or not password:
        return jsonify({"message" : "You need to introduce Email and password."}), 400
    
    user = User.query.filter_by(email=email).one_or_none()
    
    if user is None:
        return jsonify({"message": "Invalid credentials"}), 400
    
    if not check_password_hash(user.password, f"{password}{user.salt}"):
        return jsonify({"message": "Invalid credentials"}), 400
    else:
        return jsonify({"token": create_access_token(identity=str(user.id), expires_delta=timedelta(days=(1)))})


@api.route('/me', methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    return jsonify({"user": user.serialize()}), 200