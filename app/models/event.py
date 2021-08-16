from .db import db
from .rsvp import rsvps

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    day = db.Column(db.Date, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String)
    state = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    start = db.Column(db.String, nullable=False)
    end = db.Column(db.String, nullable=False)

    respondez = db.relationship(
        "Event",
        secondary=rsvps,
        primaryjoin=(rsvps.c.events_id == id),
        backref=db.backref("rsvps", lazy="dynamic"),
        lazy="dynamic"
    )

    comments = db.relationship("Comment", back_populates='event')
    user = db.relationship("User", back_populates="events")
    category = db.relationship("Category", back_populates="events")
