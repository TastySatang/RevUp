from .db import db
from .rsvp import rsvps

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    category = db.Column(db.String)
    description = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    start = db.Column(db.String, nullable=False)
    end = db.Column(db.String, nullable=False)

    attendees = db.relationship(
        "User",
        secondary=rsvps,
        back_populates='meets',
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user': self.user.to_dict_exrsvp(),
            'category': self.category,
            'description': self.description,
            'address' : self.address,
            'city' : self.city,
            'state' : self.state,
            'image' : self.image,
            'start' : self.start,
            'end' : self.end,
            'rsvp': [user.to_dict_exrsvp() for user in self.attendees]
        }

    def to_dict_exUser(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'description': self.description,
            'address' : self.address,
            'city' : self.city,
            'state' : self.state,
            'image' : self.image,
            'start' : self.start,
            'end' : self.end
        }

    comments = db.relationship("Comment", back_populates='event', cascade='delete')
    user = db.relationship("User", back_populates="events")
