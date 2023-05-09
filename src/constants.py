import os
from pathlib import Path


class Directory():
    GIT_REPO_ROOT_DIR = os.path.abspath(
        os.path.join(__file__, os.pardir)
    )
    
    GLOBAL_MIGRATE_DIR = Path(GIT_REPO_ROOT_DIR, "migration")
    
    GLOBAL_STATIC_URL_PATH = Path(GIT_REPO_ROOT_DIR, "web_application", "static")
    GLOBAL_THIRD_PARTY_DIR = Path(GIT_REPO_ROOT_DIR, "third_party")

class WebUserRole():
    USER = "user"
    ADMIN = "admin"