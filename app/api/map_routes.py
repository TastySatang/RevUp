from flask import Blueprint, request
from flask_login import login_required
from app.models import User, db
from app.config import Config


maps_routes = Blueprint("maps", __name__)

@maps_routes.route("/key", methods=["POST"])
@login_required
def google_key():
    data = request.json()
    return null
    # request.json({Config.GOOGLE_MAPS_API_KEY})
