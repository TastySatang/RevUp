from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

dr = [DataRequired()]

class CommentForm(FlaskForm):
    comment = StringField('Comment', dr)
    event_id = IntegerField('Event ID', dr)
    user_id = StringField('User ID', dr)
