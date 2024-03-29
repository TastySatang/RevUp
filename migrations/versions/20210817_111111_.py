"""empty message

Revision ID: e3394ceb28af
Revises: 49a2bf14eeb9
Create Date: 2021-08-17 11:11:11.321210

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e3394ceb28af'
down_revision = '49a2bf14eeb9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('events', sa.Column('category', sa.String(), nullable=True))
    op.alter_column('events', 'city',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.drop_constraint('events_category_id_fkey', 'events', type_='foreignkey')
    op.drop_column('events', 'category_id')
    op.add_column('users', sa.Column('type', sa.String(), nullable=True))
    op.drop_constraint('users_type_id_fkey', 'users', type_='foreignkey')
    op.drop_column('users', 'type_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('type_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('users_type_id_fkey', 'users', 'types', ['type_id'], ['id'])
    op.drop_column('users', 'type')
    op.add_column('events', sa.Column('category_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.create_foreign_key('events_category_id_fkey', 'events', 'categories', ['category_id'], ['id'])
    op.alter_column('events', 'city',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.drop_column('events', 'category')
    # ### end Alembic commands ###
