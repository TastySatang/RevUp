from flask import Blueprint
from app.models import Event

event_routes = Blueprint('events', __name__)

# /api/events/health to check if api is working correctly
@event_routes.route('/health')
def events():
  return { 'message': 'set up correctly'}
