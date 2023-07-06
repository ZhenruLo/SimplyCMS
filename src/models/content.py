from typing import TYPE_CHECKING, List

from sqlalchemy import func
from sqlalchemy.orm import Mapped, relationship

from .base_db_model import Base, db

if TYPE_CHECKING:
    from datetime import datetime

    from .column import ColumnInfo

class Content(Base, db.Model):
    __tablename__ = 'content'

    id: int = db.Column(db.Integer, primary_key = True)
    content_name: str = db.Column(db.Text)
    table_name: str = db.Column(db.Text)
    route_name: str = db.Column(db.Text, unique=True)
    description: str = db.Column(db.Text)
    content_uuid: str = db.Column(db.Text, server_default=func.random(), unique=True)
    created_timestamp: 'datetime'  = db.Column(db.DateTime, server_default=func.current_timestamp())
    content_fields: Mapped[List['ColumnInfo']] = relationship('ColumnInfo', back_populates='content')
    
    def __init__(self, content_name: str, table_name: str, route_name: str, description: str):
        self.content_name = content_name
        self.table_name = table_name
        self.route_name = route_name
        self.description = description