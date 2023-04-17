from flask import Blueprint, current_app, render_template

from .login_form import LoginForm

login_bp = Blueprint(
    "login_bp",
    __name__,
    static_folder="../static",
    static_url_path="/login/static",
    template_folder="../templates")

@login_bp.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        pass
    
    current_app.logger.info("Rendering login page")
    return render_template("login.html", form=form)