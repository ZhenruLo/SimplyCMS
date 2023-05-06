import os

class Directory():
    GIT_REPO_ROOT_DIR = os.path.abspath(
        os.path.join(__file__, os.pardir)
    )
    STATIC_URL_PATH = os.path.join(GIT_REPO_ROOT_DIR, "web_application", "static")
    THIRD_PARTY_DIR = os.path.join(GIT_REPO_ROOT_DIR, "third_party")

class WebUserRole():
    USER = "user"
    ADMIN = "admin"