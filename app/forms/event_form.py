from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired

dr = [DataRequired()]

class EventForm(FlaskForm):
    name = StringField('Name', dr)
    user_id = IntegerField('User ID', dr)
    category = StringField('Category', dr)
    description = StringField('Description', dr)
    address = StringField('Address', dr)
    city = StringField('City', dr)
    state = StringField('State', dr)
    image = StringField('Image', dr)
    start = StringField('Start Time', dr)
    end = StringField('End Time', dr)
