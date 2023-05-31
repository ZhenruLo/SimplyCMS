from flask import Blueprint, render_template
from flask_login import login_required
from security import admin_permission

content_crud_bp = Blueprint(
    'content_crud_bp',
    __name__,
    static_folder='static',
    static_url_path='/content_crud/static',
    template_folder='template')

@content_crud_bp.route('/database', methods=['GET'])
@login_required
@admin_permission.require()
def database():
    return render_template('content_crud.html')
