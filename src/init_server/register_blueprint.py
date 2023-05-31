from flask import current_app


def register_blueprint():
    from modules import (account_bp, content_crud_bp, content_manager_bp,
                         home_bp, index_bp)
    
    current_app.register_blueprint(index_bp)
    current_app.register_blueprint(account_bp)
    current_app.register_blueprint(content_crud_bp)
    current_app.register_blueprint(home_bp)
    current_app.register_blueprint(content_manager_bp)