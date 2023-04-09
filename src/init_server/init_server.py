from flask import Flask, current_app
from .register_blueprint import register_blueprint

from flask_logger import init_logger


def create_app(config_obj):
    
    flask_app = Flask(__name__, template_folder=None, static_folder=None)
    flask_app.config.from_object(config_obj)

    with flask_app.app_context():
        init_logger()
        current_app.logger.info("Blueprints and extra handler registration completed.")
    
        register_blueprint()

    return flask_app