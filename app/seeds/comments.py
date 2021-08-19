from app.models import db, Comment, event

# Adds a demo user, you can add other users here if you want
def seed_comments():
    one = Comment(
      comment = 'comment example',
      event_id = 1,
      user_id = 1,
    )

    two = Comment(
      comment = 'comment second example',
      event_id = 1,
      user_id =1,
    )

    db.session.add(one)
    db.session.add(two)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
