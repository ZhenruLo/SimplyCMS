import uuid

from sqlalchemy import func

from .base_db_model import Base, db


class WebUser(Base, db.Model):
    __tablename__ = 'web_user'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    salt = db.Column(db.String)
    email = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    role = db.Column(db.String)
    user_uuid = db.Column(db.String, server_default=func.random(), unique=True)
    created_timestamp = db.Column(db.DateTime, server_default = func.current_timestamp())

    def __init__(self, 
                 user_name: str, 
                 password: str, 
                 salt: str,
                 email: str, 
                 first_name: str, 
                 last_name: str, 
                 role: str, 
                 ):

        self.username = user_name
        self.password = password
        self.salt = salt
        self.email= email
        self.first_name = first_name
        self.last_name = last_name
        self.role = role

    def get_id(self) -> str:
        return self.user_uuid

    def is_authenticated(self) -> bool:
        return super().is_authenticated

    def is_active(self) -> bool:
        return super().is_active
    
    def is_anonymous(self) -> bool:
        return super().is_anonymous