from flask import current_app


def register_blueprint():
    from blueprints import collection_bp, index_bp, login_bp
    
    current_app.register_blueprint(index_bp)
    current_app.register_blueprint(login_bp)
    current_app.register_blueprint(collection_bp)