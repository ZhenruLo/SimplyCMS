import uuid

from sqlalchemy import DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from .base_db_model import Base, db


class WebUser(Base, db.Model):
    __tablename__ = 'web_user'

    id: Mapped[int] = mapped_column(Integer, primary_key = True)
    username: Mapped[str] = mapped_column(String)
    password: Mapped[str] = mapped_column(String)
    salt: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, nullable=True)
    first_name: Mapped[str] = mapped_column(String, nullable=True)
    last_name: Mapped[str] = mapped_column(String, nullable=True)
    role: Mapped[str] = mapped_column(String)
    user_uuid: Mapped[str] = mapped_column(String, server_default=func.random(), unique=True)
    created_timestamp: Mapped[DateTime] = mapped_column(DateTime, server_default = func.current_timestamp())

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