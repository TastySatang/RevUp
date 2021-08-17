from .db import db


class Type(db.Model):
    __tablename__ = 'types'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)


