from flask import Blueprint, current_app, jsonify, request
from flask_login import login_required

from models import db, create_model, reflect_database

database_bp = Blueprint(
    "database_bp",
    __name__,
    static_folder="../static",
    static_url_path="/database/static",
    template_folder="../templates")

@database_bp.route("/database/create", methods=["POST"])
def create_database():
    result = False
    msg = "Create database failed."

    reflect_database()
    form_data = dict(request.form)
    create_model(form_data.get('table_name'))
    
    db.create_all()

    json_data = {
        "result": result,
        "msg": msg,
    }

    current_app.logger.info(f"Result dict from database_bp.create_database, result: {result}, msg: {msg}")
    return jsonify(json_data)
