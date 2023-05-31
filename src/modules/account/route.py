from constants import WebUserRole
from database import WebUser, db
from flask import (Blueprint, current_app, jsonify, redirect, render_template,
                   url_for)
from flask_login import current_user, login_required, login_user, logout_user
from flask_negotiate import consumes
from flask_principal import AnonymousIdentity, Identity, identity_changed
from security import check_pw

from .form import LoginForm

account_bp = Blueprint(
    'account_bp',
    __name__,
    static_folder='static',
    static_url_path='/login/static',
    template_folder='template')

@account_bp.route('/login', methods=['GET'])
def login():
    current_app.logger.info('Rendering login page')
    return render_template('login.html')

@account_bp.route('/login/verify', methods=['POST'])
def verify_login():
    form = LoginForm()
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

    current_app.logger.info(f'Result data from account_bp.verify_login, result: {result}, msg: {msg}')
    return jsonify(json_data)
    
@account_bp.route('/username', methods=['GET'])
@login_required
@consumes('application/json')
def log_username():
    user_uuid = current_user.get_id()

    user: 'WebUser' = db.session.query(WebUser).filter(WebUser.user_uuid == user_uuid).first()
    if user.role == WebUserRole.ADMIN:
        role = True
    else:
        role = False
        
    json_data = {
        'username': user.username,
        'role': role,
    }

    current_app.logger.info(f'Result data from account_bp.log_username, user fetched: {user.username}')
    return jsonify(json_data)

@account_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    user_id = current_user.get_id()

    if user_id:
        logout_user()

        identity_changed.send(current_app._get_current_object(),
                          identity=AnonymousIdentity())
        current_app.logger.info('User logout')
    return redirect(url_for('account_bp.login'), 301)