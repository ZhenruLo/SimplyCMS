from flask import Flask, current_app

from flask_logger import init_logger
from models import db, migrate
from security import csrf, login_manager

from .register_blueprint import register_blueprint


def create_app(config_obj):
    
    flask_app = Flask(__name__, template_folder=None, static_folder=None)
    flask_app.config.from_object(config_obj)

    csrf.init_app(flask_app)
    login_manager.init_app(flask_app)
    
    db.init_app(flask_app)
    migrate.init_app(flask_app, db)
    
    with flask_app.app_context():
        init_logger()
        db.create_all()
        current_app.logger.info("Blueprints and extra handler registration completed.")
    
        register_blueprint()

    return flask_app