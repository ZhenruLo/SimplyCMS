import os
from datetime import timedelta


class Config():
    DEBUG = True
    
    SECRET_KEY = '3dac34eb0fa370731b59ccdc414415e7'
    
    SESSION_PROTECTION = 'strong'
    
    REMEMBER_COOKIE_SECURE: True
    REMEMBER_COOKIE_SAMESITE = 'Lax'
    REMEMBER_COOKIE_HTTPONLY = True
    
    PERMANENT_SESSION_LIFETIME = timedelta(hours=48)

    if os.environ.get('IN_DOCKER'):
        SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@postgre_db:5432/database' 
    else:
        SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@localhost:5432/database' 
        
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    
    MAIL_SERVER = None
    MAIL_SERVER_ERROR = None
    MAIL_ADMIN = None
    MAIL_PORT = 465
    MAIL_USE_SSL = False
    MAIL_USE_TLS = True
    
    JSON_SORT_KEYS = False