import os
from pathlib import Path


class Directory():
    GIT_REPO_ROOT_DIR = os.path.abspath(
        os.path.join(__file__, os.pardir)
    )
    
    GLOBAL_SERVER_ASSET_DIR = Path(GIT_REPO_ROOT_DIR, 'server_asset')
    
    GLOBAL_MIGRATE_DIR = Path(GIT_REPO_ROOT_DIR, 'migration')
    
    GLOBAL_STATIC_URL_DIR = Path(GIT_REPO_ROOT_DIR, 'web_application', 'static')
    GLOBAL_THIRD_PARTY_DIR = Path(GIT_REPO_ROOT_DIR, 'third_party')

class WebUserRole():
    USER = 'user'
    ADMIN = 'admin'
    
class FileName():
    SERVER_CERTIFICATE_FILE = 'server.crt'
    SERVER_PRIVATE_KEY_FILE = 'server.key'
    
class RelationType():
    ONE_TO_ONE = 'one_to_one'
    ONE_TO_MANY = 'one_to_many'
    MANY_TO_ONE = 'many_to_one'
    MANY_TO_MANY = 'many_to_many'
    
class ColumnType():
    TEXT = 'text'
    STRING = 'string'
    NUMERIC = 'numeric'
    INTEGER = 'integer'
    DATE = 'date'
    BOOLEAN = 'boolean'
    RELATION = 'relation'
    MEDIA = 'media'
    JSON = 'json'
    
