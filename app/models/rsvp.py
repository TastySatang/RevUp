from sqlalchemy.orm import relationship
from .db import db

rsvps = db.Table(
  "rsvps",
  db.Column("events_id", db.Integer,  db.ForeignKey('events.id'), nullable=False),
  db.Column("users_id", db.Integer, db.ForeignKey('users.id'), nullable=False)
)

# events_id = relationship("Events")
# users_id = relationship("Users")
