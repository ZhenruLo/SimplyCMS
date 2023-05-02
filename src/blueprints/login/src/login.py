from flask import (Blueprint, current_app, jsonify, redirect, render_template,
                   url_for)
from flask_login import login_user
from models import WebUser, db
from security import check_pw

from .login_form import LoginForm

login_bp = Blueprint(
    "login_bp",
    __name__,
    static_folder="../static",
    static_url_path="/login/static",
    template_folder="../template")

@login_bp.route("/login", methods=["GET"])
def login():
    current_app.logger.info("Rendering login page")
    return render_template("login.html")

@login_bp.route("/login/verify", methods=["POST"])
def verify_login():
    form = LoginForm()
    result = False
    msg = "Login failed, please try again"

    if form.validate_on_submit():
        user: 'WebUser' = db.session.query(WebUser).filter(WebUser.username==form.username.data).first()
        if user and check_pw(form.password.data, user.password.encode('utf-8')):
            login_user(user)
            result = True
            msg = url_for("home_bp.home")
        else:
            msg = "Username or password incorrect, please try again"
            
    json_data = {
        "result": result,
        "msg": msg,
    }

    current_app.logger.info(f"Result dict from login_bp.verify_login, result: {result}, msg: {msg}")
    return jsonify(json_data)
    