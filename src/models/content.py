from typing import TYPE_CHECKING, List

from sqlalchemy import Boolean, DateTime, Integer, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import expression

from .base_db_model import Base, db

if TYPE_CHECKING:
    from .column import ColumnInfo
    

class Content(Base, db.Model):
    __tablename__ = 'content'

    id: Mapped[int] = mapped_column(Integer, primary_key = True)
    content_name: Mapped[str] = mapped_column(Text)
    table_name: Mapped[str] = mapped_column(Text)
    route_name: Mapped[str] = mapped_column(Text, unique=True)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    update_required: Mapped[bool] = mapped_column(Boolean, server_default=expression.false())
    pending: Mapped[bool] = mapped_column(Boolean, server_default=expression.false())
    content_uuid: Mapped[str] = mapped_column(Text, server_default=func.random(), unique=True)
    created_timestamp: Mapped[DateTime]  = mapped_column(DateTime, server_default=func.current_timestamp())
    content_fields: Mapped[List['ColumnInfo']] = relationship('ColumnInfo', cascade = "all,delete", back_populates='content')
    
    def __init__(self, content_name: str, table_name: str, route_name: str, description: str):
        self.content_name = content_name
        self.table_name = table_name
        self.route_name = route_name
        self.description = description