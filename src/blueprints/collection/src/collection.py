from flask import Blueprint, current_app, jsonify, request
from flask_login import login_required

from models import db, create_model, reflect_database

collection_bp = Blueprint(
    "collection_bp",
    __name__,
    static_folder="../static",
    static_url_path="/collection/static",
    template_folder="../templates")

@collection_bp.route("/collection/create", methods=["POST"])
@login_required
def create_collection():
    result = False
    msg = "Create collection failed."

    reflect_database()
    form_data = dict(request.form)
    create_model(form_data.get('table_name'))
    
    db.create_all()

    json_data = {
        "result": result,
        "msg": msg,
    }

    current_app.logger.info(f"Result dict from collection_bp.create_collection, result: {result}, msg: {msg}")
    return jsonify(json_data)
