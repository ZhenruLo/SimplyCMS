from .content_crud import content_crud_bp
from .content_manager import content_manager_bp
from .home import home_bp
from .index import index_bp
from .account import account_bp

__all__ = [
    'index_bp',
    'account_bp',
    'content_crud_bp',
    'home_bp',
    'content_manager_bp',
]
