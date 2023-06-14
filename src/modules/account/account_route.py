from flask import (Blueprint, abort, current_app, jsonify, redirect,
                   render_template, url_for)
from flask_login import login_required

from .account_controller import check_login_info, get_username, log_out

account_bp = Blueprint(
    'account_bp',
    __name__,
    static_folder='static',
    static_url_path='/login/static',
    template_folder='template')

@account_bp.route('/login', methods=['GET'])
def login():
    current_app.logger.info('Rendering login page')
    return render_template('login/login.html')

@account_bp.route('/login/info', methods=['POST'])
def verify_login():
    json_data = check_login_info()

    current_app.logger.info(f"Result data from account_bp.verify_login, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)
    
@account_bp.route('/username', methods=['GET'])
@login_required
def username():
    json_data = get_username()

    current_app.logger.info(f"Result data from account_bp.username, user fetched: {json_data['username']}")
    return jsonify(json_data)

@account_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    json_data = log_out()
    if json_data['result']:
        current_app.logger.info('User logout')
        return redirect(url_for('account_bp.login'), 301)
    else:
        abort(400)