from .database import database_bp
from .index import index_bp
from .login import login_bp
from .home import home_bp

__all__ = [
    "index_bp",
    "login_bp",
    "database_bp",
    "home_bp",
]
