from flask import Blueprint, redirect, url_for
from flask_login import current_user

index_bp = Blueprint(
    "index_bp", 
    __name__,
    static_folder = "../static",
    static_url_path="/index/static",
    template_folder = "../template")


@index_bp.route("/", methods= ["GET"])
def index():
    if current_user.get_id():
        return redirect(url_for("home_bp.home"))
    else:
        return redirect(url_for("login_bp.login"))