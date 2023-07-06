from typing import TYPE_CHECKING, List

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_db_model import Base, db

if TYPE_CHECKING:
    from datetime import datetime

    from .content import Content


class ColumnInfo(Base, db.Model):
    __tablename__ = 'column_info'

    id: int = db.Column(db.Integer, primary_key = True)
    column_name: str = db.Column(db.Text)
    column_type: str = db.Column(db.Text)
    column_unique: bool = db.Column(db.Boolean)
    column_nullable: bool = db.Column(db.Boolean)
    column_default: str = db.Column(db.Text)
    column_order: int = db.Column(db.Integer)
    column_uuid: str = db.Column(db.Text, server_default=func.random(), unique=True)
    created_timestamp: 'datetime' = db.Column(db.DateTime, server_default=func.current_timestamp())
    content_id: int = db.Column(db.Integer, db.ForeignKey('content.id'))
    content: Mapped[List['Content']] = relationship('Content', back_populates='content_fields')
    
    def __init__(self, column_name: str, column_type: str, column_unique: bool, column_nullable: bool, column_default: str, column_order: int):
        self.column_name = column_name
        self.column_type = column_type
        self.column_unique = column_unique
        self.column_nullable = column_nullable
        self.column_default = column_default
        self.column_order = column_order