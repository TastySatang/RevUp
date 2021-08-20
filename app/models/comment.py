from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String, nullable=False)
    event_id = db.Column(db.Integer,  db.ForeignKey('events.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    event = db.relationship("Event", back_populates='comments')
    user = db.relationship("User", back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
        }
