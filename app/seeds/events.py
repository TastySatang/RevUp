from app.models import db, Event
import datetime


# Adds a demo user, you can add other users here if you want
def seed_events():
    one = Event(
      name = "Running Event",
      user_id = 1,
      category_id = 1,
      day = datetime.datetime.now(),
      address = '123 car street',
      city = 'Detroit',
      state = 'Michigan',
      image = 'https://static.messynessychic.com/wp-content/uploads/2012/12/tumblr_m1g06arTYo1qh5xh1o1_1280.jpg',
      start = '1200',
      end = '1400'
    )

    db.session.add(one)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
