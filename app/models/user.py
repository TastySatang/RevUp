from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .rsvp import rsvps


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    vehicle = db.Column(db.String(50))
    vehicle_pic = db.Column(db.String)
    type = db.Column(db.String)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'description': self.description,
            'vehicle': self.vehicle,
            'vehicle_pic': self.vehicle_pic,
            'type': self.type,
            'rsvp': [event.to_dict_exUser() for event in self.meets]
        }

    def to_dict_exrsvp(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'description': self.description,
            'vehicle': self.vehicle,
            'vehicle_pic': self.vehicle_pic,
            'type': self.type,
        }

    meets = db.relationship(
        "Event",
        secondary=rsvps,
        back_populates='attendees',
    )

    comments = db.relationship("Comment", back_populates='user')
    events = db.relationship("Event", back_populates='user')
