from flask import Blueprint, current_app, jsonify, render_template, request
from flask_login import login_required

from .content_manager_controller import create_database, fetch_table_data

content_manager_bp = Blueprint(
    'content_manager_bp',
    __name__,
    static_folder='static',
    static_url_path='/content_manager/static',
    template_folder='template')

@content_manager_bp.route('/content-manager/table', methods=['GET', 'POST', 'PUT'])
@login_required
def table():
    json_data = fetch_table_data()

    current_app.logger.info(f"Result dict from dashboard_bp.database, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)
    

@content_manager_bp.route('/content-manager', methods=['GET'])
@login_required
def content_manager():
    return render_template('content_manager.html')

@content_manager_bp.route('/content-manager/databases', methods=['GET', 'POST', 'PUT'])
@login_required
def create_database():
    json_data = create_database()

    current_app.logger.info(f"Result dict from content_manager_bp.create_database, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)