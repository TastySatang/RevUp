from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Event, rsvp, db

rsvp_routes = Blueprint('rsvp', __name__)


@rsvp_routes.route('/event/<int:id>')
@login_required
def get_for_event(id):
    event = Event.query.get(id)
    rsvp = event.respondez.all()
    return jsonify(rsvp)


@rsvp_routes.route('/user/<int:id>')
@login_required
def get_for_user(id):
    user = User.query.get(id)
    rsvp = user.respondez.all()
    return jsonify(rsvp)


@rsvp_routes.route('/create', methods=['POST'])
@login_required
def create():
    data = request.get_json()
    new_rsvp = rsvp(
        users_id=data['users_id'],
        events_id=data['events_id']
    )
    db.session.add(new_rsvp)
    db.session.commit()
    return jsonify(rsvp)


@rsvp_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete(id):
    old_rsvp = rsvp.query.get(id)
    db.session.delete(old_rsvp)
    db.session.commit()
    return {'message': 'rsvp deleted'}
