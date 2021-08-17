from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Type

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    # print('users', {'vehicle':user.vehicle, 'description':user.description, 'vehicle_pic':user.vehicle_pic, 'type':type, 'username':user.username, 'email':user.email, 'id':user.id })
    return user.to_dict()
    # return {'vehicle':user.vehicle, 'description':user.description, 'vehicle_pic':user.vehicle_pic, 'type':type, 'username':user.username, 'email':user.email, 'id':user.id }
