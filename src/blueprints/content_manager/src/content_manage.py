from flask import Blueprint, current_app, jsonify, render_template, request
from flask_login import login_required
from models import create_model, db, update_model

content_manager_bp = Blueprint(
    "content_manager_bp",
    __name__,
    static_folder="../static",
    static_url_path="/content_manager/static",
    template_folder="../template")

@content_manager_bp.route("/content_manager", methods=["GET"])
@login_required
def content_manager():
    return render_template("content_manager.html")

@content_manager_bp.route("/content_manager/create", methods=["POST"])
@login_required
def create_database():
    result = False
    msg = "Create database failed."

    update_model("testing")
    # form_data = dict(request.form)
    
    # create_model(form_data.get('table_name'))

    json_data = {
        "result": result,
        "msg": msg,
    }

    current_app.logger.info(f"Result dict from content_manager_bp.create_database, result: {result}, msg: {msg}")
    return jsonify(json_data)

@content_manager_bp.route("/content_manager/databases", methods=["GET"])
@login_required
def databases():
    result = False
    msg = "Fetch databases failed."
    database = None

    metadata = reflect_database()
    
    result = True
    msg = "Databases fetched"
    
    json_data = {
        "result": result,
        "msg": msg,
        "database": database,
    }

    current_app.logger.info(f"Result dict from content_manager_bp.databases, result: {result}, msg: {msg}")
    return jsonify(json_data)