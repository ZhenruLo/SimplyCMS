from flask import current_app


def register_blueprint():
    from blueprints import (content_manager_bp, database_bp, home_bp, index_bp,
                            login_bp, logout_bp)
    
    current_app.register_blueprint(index_bp)
    current_app.register_blueprint(login_bp)
    current_app.register_blueprint(database_bp)
    current_app.register_blueprint(home_bp)
    current_app.register_blueprint(logout_bp)
    current_app.register_blueprint(content_manager_bp)