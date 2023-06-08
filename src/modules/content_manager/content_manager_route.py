from flask import Blueprint, current_app, jsonify, render_template
from flask_login import login_required

from .content_manager_controller import (fetch_table_data, fetch_table_info,
                                         process_database, count_table_info)

content_manager_bp = Blueprint(
    'content_manager_bp',
    __name__,
    static_folder='static',
    static_url_path='/content_manager/static',
    template_folder='template')


@content_manager_bp.route('/content-manager', methods=['GET'])
@login_required
def content_manager():
    
    current_app.logger.info(f'Render content_manager.html')
    return render_template('content_manager.html')

@content_manager_bp.route('/content-manager/table-count', methods=['GET'])
@login_required
def table_count():
    json_data = count_table_info()
    
    current_app.logger.info(f"Result dict from dashboard_bp.table_count, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)

@content_manager_bp.route('/content-manager/table-info', methods=['GET'])
@login_required
def table_info():
    json_data = fetch_table_info()
    
    current_app.logger.info(f"Result dict from dashboard_bp.table_info, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)
    
@content_manager_bp.route('/content-manager/table', methods=['GET'])
@login_required
def table():
    json_data = fetch_table_data()

    current_app.logger.info(f"Result dict from dashboard_bp.table, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)

@content_manager_bp.route('/content-manager/databases', methods=['GET', 'POST', 'PUT'])
@login_required
def database():
    json_data = process_database()

    current_app.logger.info(f"Result dict from content_manager_bp.database, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)