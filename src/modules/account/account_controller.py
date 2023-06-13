from typing import TYPE_CHECKING

from constants import WebUserRole
from flask import current_app, url_for
from flask_login import current_user, login_user, logout_user
from flask_principal import AnonymousIdentity, Identity, identity_changed
from models import WebUser, db
from security import check_pw

from .account_form import LoginForm

if TYPE_CHECKING:
    from flask_wtf import FlaskForm

def check_login_info():
    form: 'FlaskForm' = LoginForm()
    result = False
    msg = 'Login failed, please try again'

    if form.validate_on_submit():
        user: 'WebUser' = db.session.query(WebUser).filter(WebUser.username==form.username.data).first()
        if user and check_pw(form.password.data, user.password.encode('utf-8')):
            if form.remember.data:
                remember = True
            else: 
                remember = False
                
            login_user(user, remember=remember)
            identity_changed.send(current_app._get_current_object(),
                                  identity=Identity(user.user_uuid))
            result = True
            msg = url_for('home_bp.home')
        else:
            msg = 'Username or password incorrect, please try again'
            
    json_data = {
        'result': result,
        'msg': msg,
    }

    return json_data
    
def get_username():
    user_uuid = current_user.get_id()

    user: 'WebUser' = db.session.query(WebUser).filter(WebUser.user_uuid == user_uuid).first()
    if user.role == WebUserRole.ADMIN:
        result = True
        msg = 'Is admin'
    else:
        result = False
        msg = 'Not admin'
        
    json_data = {
        'username': user.username,
        'result': result,
        'msg': msg,
    }

    return json_data

def log_out():
    result = False
    msg = 'Logout fail'

    user_id = current_user.get_id()
    if user_id:
        logout_user()

        identity_changed.send(current_app._get_current_object(),
                          identity=AnonymousIdentity())

        result = True
        msg = 'Logout'
    
    json_data = {
        'result': result,
        'msg': msg,
    }

    return json_data