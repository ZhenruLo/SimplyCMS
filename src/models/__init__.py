from .base_model import db
from .migrate_init import migrate
from .web_user import WebUser

__all__ =[
    'db',
    'migrate',

    'WebUser',
]
