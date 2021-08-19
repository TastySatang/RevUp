# from app.seeds.categories import seed_categories
from flask.cli import AppGroup
from .users import seed_users, undo_users
# from .categories import seed_categories, undo_categories
# from .types import seed_types, undo_types
from .events import seed_events, undo_events

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # seed_categories()
    # seed_types()
    seed_users()
    seed_events()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_categories()
    # undo_types()
    undo_users()
    undo_events()
    # Add other undo functions here
