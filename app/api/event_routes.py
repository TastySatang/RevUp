from flask import Blueprint
from app.models import Event

event_routes = Blueprint('events', __name__)


@event_routes.route('/')
def eventsH():
  events = Event.query.all()
  return {'events': [event.to_dict() for event in events]}

# /api/events/health to check if api is working correctly
@event_routes.route('/health')
def events():
  return { 'message': 'set up correctly'}



