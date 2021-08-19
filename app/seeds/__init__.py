# from app.seeds.categories import seed_categories
from app.seeds.comments import seed_comments, undo_comments
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
    seed_users()
    seed_events()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_events()
    undo_users()
    # Add other undo functions here
