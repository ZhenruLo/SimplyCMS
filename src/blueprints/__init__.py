from .database import database_bp
from .home import home_bp
from .index import index_bp
from .login import login_bp
from .logout import logout_bp
from .content_manager import content_manager_bp

__all__ = [
    'index_bp',
    'login_bp',
    'database_bp',
    'home_bp',
    'logout_bp',
    'content_manager_bp',
]
