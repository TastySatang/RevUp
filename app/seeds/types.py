# from app.models import db, Type


# # Adds a demo user, you can add other users here if you want
# def seed_types():
#     one = Type(type='American Muscle')
#     two = Type(type='JDM')
#     three = Type(type='Luxury')
#     four = Type(type='Sport Bike')
#     five = Type(type='Cruiser')
#     six = Type(type="European Sport")
#     seven = Type(type='Off-road/Baja')
#     eight = Type(type='Economy')
#     nine = Type(type='Formula')
#     ten = Type(type='Other')

#     db.session.add(one)
#     db.session.add(two)
#     db.session.add(three)
#     db.session.add(four)
#     db.session.add(five)
#     db.session.add(six)
#     db.session.add(seven)
#     db.session.add(eight)
#     db.session.add(nine)
#     db.session.add(ten)

#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and RESET IDENTITY
# # resets the auto incrementing primary key, CASCADE deletes any
# # dependent entities
# def undo_types():
#     db.session.execute('TRUNCATE types RESTART IDENTITY CASCADE;')
#     db.session.commit()
