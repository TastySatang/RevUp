from sqlalchemy.orm import relationship
from .db import db

rsvps = db.Table(
  "rsvps",
  db.Column("events_id", db.Integer,  db.ForeignKey('events.id'), nullable=False, primary_key=True),
  db.Column("users_id", db.Integer, db.ForeignKey('users.id'), nullable=False, primary_key=True)
)
