from typing import TYPE_CHECKING, List

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import expression

from .base_db_model import Base, db

if TYPE_CHECKING:
    from .content import Content


class ColumnInfo(Base, db.Model):
    __tablename__ = 'column_info'

    id: Mapped[int] = mapped_column(Integer, primary_key = True)
    column_name: Mapped[str] = mapped_column(Text)
    column_type: Mapped[str] = mapped_column(Text)
    column_unique: Mapped[bool] = mapped_column(Boolean, nullable=False)
    column_nullable: Mapped[bool] = mapped_column(Boolean, nullable=False)
    column_private: Mapped[bool] = mapped_column(Boolean, nullable=False)
    column_default: Mapped[str] = mapped_column(Text, nullable=True)
    update_required: Mapped[bool] = mapped_column(Boolean, server_default=expression.true())
    column_uuid: Mapped[str] = mapped_column(Text, server_default=func.random(), unique=True)
    created_timestamp: Mapped[DateTime] = mapped_column(DateTime, server_default=func.current_timestamp())
    content_id: Mapped[int] = mapped_column(Integer, ForeignKey('content.id'))
    content: Mapped[List['Content']] = relationship('Content', back_populates='content_fields')
    
    def __init__(self, column_name: str, column_type: str, column_unique: bool, column_nullable: bool, column_private: bool, column_default: str):
        self.column_name = column_name
        self.column_type = column_type
        self.column_unique = column_unique
        self.column_nullable = column_nullable
        self.column_private = column_private
        self.column_default = column_default