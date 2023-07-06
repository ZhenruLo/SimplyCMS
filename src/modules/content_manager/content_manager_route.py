from flask import Blueprint, current_app, jsonify, render_template
from flask_login import login_required

from .content_manager_controller import (count_table_info, fetch_table_data,
                                         fetch_table_title, process_database,
                                         process_database_content)

content_manager_bp = Blueprint(
    'content_manager_bp',
    __name__,
    static_folder='static',
    static_url_path='/content_manager/static',
    template_folder='template')


@content_manager_bp.route('/content-manager', methods=['GET'])
@login_required
def content_manager():
    
    current_app.logger.info(f'Render content-manager.html')
    return render_template('content-manager.html')

@content_manager_bp.route('/content-manager/table-count', methods=['GET'])
@login_required
def table_count():
    json_data = count_table_info()
    
    current_app.logger.info(f"Result dict from dashboard_bp.table_count, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)

@content_manager_bp.route('/content-manager/table-title', methods=['GET'])
@login_required
def table_title():
    json_data = fetch_table_title()
    
    current_app.logger.info(f"Result dict from dashboard_bp.table_title, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)
    
@content_manager_bp.route('/content-manager/table', methods=['GET'])
@login_required
def table():
    json_data = fetch_table_data()

    current_app.logger.info(f"Result dict from dashboard_bp.table, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)

@content_manager_bp.route('/content-manager/databases', methods=['POST', 'PUT', 'DELETE'])
@login_required
def database():
    json_data = process_database()

    current_app.logger.info(f"Result dict from content_manager_bp.database, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)

@content_manager_bp.route('/content-manager/database-content', methods=['GET', 'POST', 'PUT'])
@login_required
def database_content():
    json_data = process_database_content()
    
    current_app.logger.info(f"Result dict from content_manager_bp.database_content, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)
    