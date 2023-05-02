from flask import Blueprint, render_template
from flask_login import login_required

home_bp = Blueprint(
    "home_bp", 
    __name__,
    static_folder = "../static",
    static_url_path="/home/static",
    template_folder = "../template")


@home_bp.route("/home", methods= ["GET"])
@login_required
def home():
    return render_template("home.html")