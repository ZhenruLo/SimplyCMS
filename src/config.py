from datetime import timedelta


class Config():
    SECRET_KEY = '3dac34eb0fa370731b59ccdc414415e7'
    
    SEND_FILE_MAX_AGE_DEFAULT = 0
    
    SESSION_PROTECTION = 'strong'
    
    REMEMBER_COOKIE_SECURE: True
    REMEMBER_COOKIE_SAMESITE = 'Lax'
    REMEMBER_COOKIE_HTTPONLY = True
    
    PERMANENT_SESSION_LIFETIME = timedelta(hours=48)

    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@localhost:5432/database' 
    
    MAIL_SERVER = None
    MAIL_SERVER_ERROR = None
    MAIL_ADMIN = None
    MAIL_PORT = 465
    MAIL_USE_SSL = False
    MAIL_USE_TLS = True
    
    JSON_SORT_KEYS = False

class ProductionConfig(Config):
    # SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@postgre_db:5432/database'
    
    CELERY = { 
        "broker_url": 'redis://localhost:6379/0',
        "result_backend": 'redis://localhost:6379/0',
        "worker_concurrency": 1,
    }
    CELERY_WORKER_NAME = "celery@server_worker1"

class DevelopmentConfig(Config):
    DEVELOPMENT = True
    ENV = 'development'
    
    CELERY = {
        "broker_url": 'redis://localhost:6379/0',
        "result_backend": 'redis://localhost:6379/0',
        "worker_concurrency": 1,
    }
    CELERY_WORKER_NAME = "celery@server_worker1"