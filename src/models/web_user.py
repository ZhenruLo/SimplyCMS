from .base_model import Base, db
from sqlalchemy import func


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
    user_uuid = db.Column(db.String, server_default = func.abs(func.random()))

    def __init__(self, 
                    user_name: 'str', 
                    password: 'str', 
                    salt: 'str', 
                    email: 'str', 
                    first_name:'str', 
                    last_name:'str', 
                    role:'str', 
                ):

        self.username = user_name
        self.password = password
        self.salt = salt
        self.email= email
        self.first_name = first_name
        self.last_name = last_name
        self.role = role

    def get_id(self):
        return self.user_uuid

    def is_authenticated(self):
        return super().is_authenticated

    def is_active(self):
        return super().is_active
    
    def is_anonymous(self):
        return super().is_anonymous
    