"""z1!

Revision ID: 49a2bf14eeb9
Revises: ffdc0a98111c
Create Date: 2021-08-16 09:24:07.983689

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '49a2bf14eeb9'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('day', sa.Date(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('state', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('start', sa.DateTime(), nullable=False),
    sa.Column('end', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rsvps',
    sa.Column('events_id', sa.Integer(), nullable=False),
    sa.Column('users_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['events_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], )
    )
    op.add_column('users', sa.Column('description', sa.String(length=255), nullable=False))
    op.add_column('users', sa.Column('vehicle', sa.String(length=50), nullable=True))
    op.add_column('users', sa.Column('vehicle_pic', sa.String(), nullable=True))
    op.add_column('users', sa.Column('type_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'users', 'types', ['type_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='foreignkey')
    op.drop_column('users', 'type_id')
    op.drop_column('users', 'vehicle_pic')
    op.drop_column('users', 'vehicle')
    op.drop_column('users', 'description')
    op.drop_table('rsvps')
    op.drop_table('comments')
    op.drop_table('events')
    op.drop_table('types')
    op.drop_table('categories')
    # ### end Alembic commands ###
