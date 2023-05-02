from flask import (Blueprint, current_app, jsonify, redirect, render_template, request,
                   url_for)
from flask_login import login_required, logout_user, current_user

logout_bp = Blueprint(
    "logout_bp",
    __name__,
    static_folder="../static",
    static_url_path="/logout/static",
    template_folder="../template")

@logout_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    user_id = current_user.get_id()

    if user_id:
        logout_user()
        current_app.logger.info("User logout")
    return redirect(url_for("login_bp.login"), 301)
