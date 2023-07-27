from flask import Blueprint, current_app, jsonify, render_template
from flask_login import login_required

from .content_manager_controller import (count_table_info, fetch_state,
                                         fetch_table_data, fetch_table_title,
                                         fetch_urls, process_database,
                                         process_database_content,
                                         reroute_page)

content_manager_bp = Blueprint(
    'content_manager_bp',
    __name__,
    static_folder='static',
    static_url_path='/content_manager/static',
    template_folder='template')

@content_manager_bp.route('/content-manager', defaults={'path': ''}, methods=['GET'])
@content_manager_bp.route('/content-manager/<path:path>', methods=['GET'])
@login_required
def content_manager(path):
    json_data = reroute_page(path)
    
    current_app.logger.info(f'Render content-manager.html, path={path}')
    return render_template('content-manager.html', state=json_data)

@content_manager_bp.route('/content-manager/state', methods=['GET'])
@login_required
def state():
    json_data = fetch_state()

    current_app.logger.info(f"Result dict from content_manager_bp.state, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)

@content_manager_bp.route('/content-manager/urls', methods=['GET'])
@login_required
def urls():
    json_data = fetch_urls()

    current_app.logger.info(f"Result dict from content_manager_bp.urls, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)

@content_manager_bp.route('/content-manager/table-count', methods=['GET'])
@login_required
def table_count():
    json_data = count_table_info()
    
    current_app.logger.info(f"Result dict from content_manager_bp.table_count, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)

@content_manager_bp.route('/content-manager/table-title', methods=['GET'])
@login_required
def table_title():
    json_data = fetch_table_title()
    
    current_app.logger.info(f"Result dict from content_manager_bp.table_title, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)
    
@content_manager_bp.route('/content-manager/table', methods=['GET'])
@login_required
def table():
    json_data = fetch_table_data()

    current_app.logger.info(f"Result dict from content_manager_bp.table, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)

@content_manager_bp.route('/content-manager/database-content', methods=['GET', 'POST', 'PUT'])
@login_required
def database_content():
    json_data = process_database_content()
    
    current_app.logger.info(f"Result dict from content_manager_bp.database_content, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)

@content_manager_bp.route('/content-manager/databases', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def database():
    json_data = process_database()

    current_app.logger.info(f"Result dict from content_manager_bp.database, result: {json_data['result']}, msg: {json_data['msg']}")
    return jsonify(json_data)
