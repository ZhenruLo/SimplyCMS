import os
from datetime import timedelta


class Config():
    DEBUG = False
    FLASK_ENV = "development"
    
    SECRET_KEY = "3dac34eb0fa370731b59ccdc414415e7"
    
    SESSION_PROTECTION = "strong"
    REMEMBER_COOKIE_SECURE: True
    REMEMBER_COOKIE_SAMESITE = "Lax"
    
    REMEMBER_COOKIE_HTTPONLY = True
    PERMANENT_SESSION_LIFETIME = timedelta(hours=48)

    if os.environ.get("IN_DOCKER"):
        SQLALCHEMY_DATABASE_URI = "postgresql://postgres:root@postgre_db:5432/collection" 
    else:
        SQLALCHEMY_DATABASE_URI = "postgresql://postgres:root@localhost:5432/collection" 
        
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    CELERY_WORKER_NAME = "celery@server_worker1" 
    CELERY = {
        "broker_url": 'redis://localhost:6379/0',
        "result_backend": 'redis://localhost:6379/0',
        "worker_concurrency": 1,
    }
    
    MAIL_SERVER = "smtp.ndrmedical.com"
    MAIL_SERVER_ERROR = "server-error@ndrmedical.com"
    MAIL_ADMIN = "zhenru@ndrmedical.com"
    MAIL_PORT = 465
    MAIL_USE_SSL = False
    MAIL_USE_TLS = True
    
    JSON_SORT_KEYS = False