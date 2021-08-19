from app.forms import CommentForm
from flask import Blueprint, request
from flask.wrappers import Request
from app.models import db, Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<id>', methods=['PUT'])
def commentPost(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment.query.filter(Comment.id==id).first()
        form.populate_obj(comment)
        db.session.add(comment)
        db.session.commit()
        return {'comments': [comment.to_dict()]}
    return {'errors': [form.errors]}

@comment_routes.route('/<id>', methods=['DELETE'])
def commentDelete(id):
    comment = Comment.query.filter(Comment.id == id).first()
    db.session.delete(comment)
    db.session.commit()
    return {'comments': id}

