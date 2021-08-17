from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',
        description='into drag racing', vehicle='69 Camaro ss',
        vehicle_pic='https://manofmany.com/wp-content/uploads/2018/12/1969-chevrolet-camaro-SS.jpg',
        type='American Muscle'
        )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password',
        description='rb28 all the way', vehicle='r34 skyline',
        vehicle_pic='https://toprankglobal.jp/picture/vehicle/22672_1096.jpg',
        type='JDM'
        )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',
        description='dorito power', vehicle='RX-7',
        vehicle_pic='https://www.rx7club.com/attachments/3rd-generation-specific-1993-2002-16/453578d1326906156-david-hayes%92-end-3-rotor-build-rebuild-rebuild-reflection-untitled_3.jpg',
        type='JDM'
        )


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
