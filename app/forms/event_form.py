from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, DateField
from wtforms.validators import DataRequired

dr = [DataRequired()]

class EventForm(FlaskForm):
    name = StringField('name', dr)
    category = SelectField('category', choices=[(1,'Meet & Greet'),
    (2, 'Track Event'), (3, 'Drag Event'), (4, 'Car show'), (5, 'Virtual'),
    (6, 'Promotional'), (7, 'Cruise'), (8, 'Demolition Derby'), (9, 'Others')])
    day = DateField('Date', dr)
    address = StringField('Address', dr)
    city = StringField('City', dr)
    state = StringField('State', dr)
    image = StringField('Image', dr)
    start = StringField('State Time', dr)
    end = StringField('End Time', dr)

