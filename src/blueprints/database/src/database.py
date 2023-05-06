from flask import Blueprint, render_template
from flask_login import login_required

database_bp = Blueprint(
    "database_bp",
    __name__,
    static_folder="../static",
    static_url_path="/database/static",
    template_folder="../template")

@database_bp.route("/database", methods=["GET"])
@login_required
def database():
    return render_template("database.html")
