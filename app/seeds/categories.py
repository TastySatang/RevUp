from app.models import db, Category


# Adds a demo user, you can add other users here if you want
def seed_categories():
    one = Category(category='Meet & Greet')
    two = Category(category='Track Event')
    three = Category(category='Drag Event')
    four = Category(category='Car Show')
    five = Category(category='Virtual')
    six = Category(category='Promotional')
    seven = Category(category='Cruise')
    eight = Category(category='Demolition-Derby')
    nine = Category(category='Others')

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)
    db.session.add(six)
    db.session.add(seven)
    db.session.add(eight)
    db.session.add(nine)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_categories():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
