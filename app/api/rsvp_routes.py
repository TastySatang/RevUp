from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Event, rsvp, db

rsvp_routes = Blueprint('rsvp', __name__)


# @rsvp_routes.route('/event/<int:id>')
# @login_required
# def get_for_event(id):
#     event = Event.query.get(id)
#     rsvp = event.respondez.all()
#     return jsonify(rsvp)


# @rsvp_routes.route('/user/<int:id>')
# @login_required
# def get_for_user(id):
#     user = User.query.get(id)
#     rsvp = user.respondez.all()
#     return jsonify(rsvp)


@rsvp_routes.route('/create', methods=['POST'])
@login_required
def create():
    data = request.get_json()
    user = User.query.get(data['users_id'])
    event = Event.query.get(data['events_id'])
    user.meets.append(event)
    db.session.add(user)
    db.session.commit()
    return {'message': 'rsvp created'}



@rsvp_routes.route('/delete', methods=['DELETE'])
@login_required
def delete():
    data = request.get_json()
    user = User.query.get(data['users_id'])
    event = Event.query.get(data['events_id'])
    user.meets.remove(event)
    db.session.add(user)
    db.session.commit()
    return {'message': 'rsvp deleted'}
