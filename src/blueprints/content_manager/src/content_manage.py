from flask import Blueprint, current_app, jsonify, render_template, request
from flask_login import login_required

from models import create_table, db, get_tables_information, update_table

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

@content_manager_bp.route("/content_manager/databases", methods=["GET", "POST", "PUT"])
@login_required
def create_database():
    result = False
    if request.method == "GET":
        msg = "Fetch databases failed."
        databases = None
        
        databases = get_tables_information()

        result = True
        msg = "Databases fetched"

        json_data = {
            "result": result,
            "msg": msg,
            "databases": list(databases.keys()),
        }

        current_app.logger.info(f"Result dict from content_manager_bp.databases, result: {result}, msg: {msg}")

    elif request.method == "POST":
        msg = "Create database failed."

        form_data = dict(request.form)
        
        create_table(form_data.get('table_name'))

        result = True
        msg = "Databases created"

        json_data = {
            "result": result,
            "msg": msg,
        }

    elif request.method == "PUT":
        msg = "Update database failed"

        update_table("testing")
        
        result = True
        msg = "Databases created"

        json_data = {
            "result": result,
            "msg": msg,
        }

    current_app.logger.info(f"Result dict from content_manager_bp.create_database, result: {result}, msg: {msg}")
    return jsonify(json_data)