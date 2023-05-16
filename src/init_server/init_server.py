from flask import Flask, current_app
from flask_login import current_user
from flask_migrate import init, migrate, stamp, upgrade
from flask_principal import RoleNeed, UserNeed, identity_loaded

from constants import Directory
from flask_logger import init_logger
from models import db, migrate_app
from security import csrf, login_manager, principals

from .register_blueprint import register_blueprint
from .register_error_handler import register_error_handler


def create_app(config_obj):
    
    flask_app = Flask(__name__, template_folder="../../public/template", static_folder="../../public/static")
    flask_app.config.from_object(config_obj)

    csrf.init_app(flask_app)
    login_manager.init_app(flask_app)
    principals.init_app(flask_app)
    
    db.init_app(flask_app)
    migrate_app.init_app(flask_app, db)
    
    with flask_app.app_context():
        db.create_all()
        db.reflect()
        @identity_loaded.connect_via(flask_app)
        def on_identity_loaded(sender, identity):
            identity.user = current_user
            
            if hasattr(current_user, "user_uuid"):
                identity.provides.add(UserNeed(current_user.user_uuid))
            if hasattr(current_user, "role"):
                identity.provides.add(RoleNeed(current_user.role))

        register_blueprint()
        register_error_handler()

        if not Directory.GLOBAL_MIGRATE_DIR.exists():
            init(Directory.GLOBAL_MIGRATE_DIR.as_posix(), multidb=False)
        stamp(Directory.GLOBAL_MIGRATE_DIR.as_posix())
        migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())
        upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())
        
        init_logger()
        current_app.logger.info("Blueprints and extra handler registration completed.")

    return flask_app