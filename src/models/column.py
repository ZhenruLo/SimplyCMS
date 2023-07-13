from typing import TYPE_CHECKING, List

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_db_model import Base, db

if TYPE_CHECKING:
    from .content import Content


class ColumnInfo(Base, db.Model):
    __tablename__ = 'column_info'

    id: Mapped[int] = mapped_column(Integer, primary_key = True)
    column_name: Mapped[str] = mapped_column(Text)
    column_type: Mapped[str] = mapped_column(Text)
    column_unique: Mapped[bool] = mapped_column(Boolean, nullable=True)
    column_nullable: Mapped[bool] = mapped_column(Boolean, nullable=True)
    column_default: Mapped[str] = mapped_column(Text, nullable=True)
    column_order: Mapped[int] = mapped_column(Integer)
    column_uuid: Mapped[str] = mapped_column(Text, server_default=func.random(), unique=True)
    created_timestamp: Mapped[DateTime] = mapped_column(DateTime, server_default=func.current_timestamp())
    content_id: Mapped[int] = mapped_column(Integer, ForeignKey('content.id'))
    content: Mapped[List['Content']] = relationship('Content', back_populates='content_fields')
    
    def __init__(self, column_name: str, column_type: str, column_unique: bool, column_nullable: bool, column_default: str, column_order: int):
        self.column_name = column_name
        self.column_type = column_type
        self.column_unique = column_unique
        self.column_nullable = column_nullable
        self.column_default = column_default
        self.column_order = column_order