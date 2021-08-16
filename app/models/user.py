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
    type_id = db.Column(db.Integer, db.ForeignKey("types.id"))

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
            'email': self.email
        }

    respondez = db.relationship(
        "User",
        secondary=rsvps,
        primaryjoin=(rsvps.c.users_id == id),
        backref=db.backref("rsvps", lazy="dynamic"),
        lazy="dynamic"
    )

    comments = db.relationship("Comment", back_populates='user')
    events = db.relationship("Event", back_populates='user')
    type = db.relationship("Type", back_populates='users')
