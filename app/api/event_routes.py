from flask import Blueprint, request
from flask.wrappers import Request
from app.models import db, Event
from app.forms import EventForm

event_routes = Blueprint('events', __name__)


@event_routes.route('/')
def eventsH():
  events = Event.query.all()
  return {'events': [event.to_dict() for event in events]}

@event_routes.route('/<id>')
def eventOne(id):
  event = Event.query.filter_by(id=id).one()
  return {'events': [event.to_dict()]}


@event_routes.route('/', methods=['POST'])
def eventPost():
  form = EventForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  print('before validate', form.data)
  if form.validate_on_submit():
    print('INSIDE EVENT ROUTE VALIDATE ON SUBMIT')
    event = Event(
      name=form.data['name'],
      user_id=form.data['user_id'],
      category=form.data['category'],
      day=form.data['day'],
      address=form.data['address'],
        city=form.data['city'],
      state=form.data['state'],
      image=form.data['image'],
      start=form.data['start'],
      end=form.data['end'],
    )

    db.session.add(event)
    db.session.commit()
    print('inside validation p', event.to_dict())
    return {'events': [event.to_dict()]}
  return {'errors': [form.errors]}

@event_routes.route('/<id>', methods=['PUT'])
def eventPut(id):
  print('inside the put route', id)
  form = EventForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    print('inside validate')
    event = Event.query.filter(Event.id==id).first()
    form.populate_obj(event)
    db.session.add(event)
    db.session.commit()
    return {'events': [event.to_dict()]}
  return {'errors': [form.errors]}

@event_routes.route('/<id>', methods=['DELETE'])
def eventDel(id):
  event = Event.query.filter_by(id=id).first()
  db.session.delete(event)
  db.session.commit()
  return {'events': id}

# /api/events/health to check if api is working correctly
@event_routes.route('/health')
def events():
  return { 'message': 'set up correctly'}



