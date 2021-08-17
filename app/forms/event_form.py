from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, DateField
from wtforms.validators import DataRequired

dr = [DataRequired()]

class EventForm(FlaskForm):
    name = StringField('name', dr)
    category = StringField('category'),
    day = DateField('Date', dr)
    address = StringField('Address', dr)
    city = StringField('City', dr)
    state = StringField('State', dr)
    image = StringField('Image', dr)
    start = StringField('State Time', dr)
    end = StringField('End Time', dr)
