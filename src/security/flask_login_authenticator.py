from flask_login import LoginManager

from database import WebUser, db

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_uuid):
    return db.session.query(WebUser).filter(WebUser.user_uuid==user_uuid).first()