from flask import current_app


def register_blueprint():
    from blueprints import index_bp
    
    current_app.register_blueprint(index_bp)