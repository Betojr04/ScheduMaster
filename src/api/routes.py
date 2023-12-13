"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException, recalculate_seniority
import hashlib
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import datetime



api = Blueprint('api', __name__)
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


"""
ROUTE FOR REGISTERING A NEW USER
"""
@api.route('/register', methods=['POST'])
def register_account():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    employee_id = request.json.get("employee_id", None)
    name = request.json.get("name", None)
    hire_date_str = request.json.get("hire_date", None)
    birthday_str = request.json.get("birthday", None)

    # Basic validation
    if not all([email, password, employee_id, name, hire_date_str, birthday_str]):
        raise APIException('Missing information', status_code=400)

    try:
        hire_date = datetime.strptime(hire_date_str, '%Y-%m-%d')
        birthday = datetime.strptime(birthday_str, '%Y-%m-%d')
    except ValueError:
        raise APIException('Invalid date format', status_code=400)

    # Check if user already exists
    existing_user = User.query.filter_by(employee_id=employee_id).first()
    if existing_user:
        raise APIException('User already exists', status_code=400)

    # Hashing the password
    hashed_password = generate_password_hash(password)

    # Creating new user instance
    new_user = User(
        email=email,
        employee_id=employee_id,
        name=name,
        password_hash=hashed_password,
        hire_date=hire_date,
        birthday=birthday
    )
    db.session.add(new_user)
    db.session.commit()

    # Recalculate seniority for all users
    recalculate_seniority()

    # Generate JWT token
    access_token = create_access_token(identity=new_user.id)

    return jsonify({"token": access_token, "user_id": new_user.id}), 201

"""
ROUTE FOR LOGGING IN AN EXISITNG USER
"""
@api.route('/login', methods=['POST'])
def login():
    employee_id = request.json.get("employee_id", None)
    password = request.json.get("password", None)

    # Basic validation
    if not employee_id or not password:
        raise APIException('Missing employee_id or password', status_code=400)

    # Fetch user from the database
    user = User.query.filter_by(employee_id=employee_id).first()

    # User exists and password check
    if user and check_password_hash(user.password_hash, password):
        # Generate JWT token
        access_token = create_access_token(identity=user.id)
        return jsonify({"token": access_token, "user_id": user.id}), 200
    else:
        raise APIException('Invalid credentials', status_code=401) 