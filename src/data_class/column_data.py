from typing import TYPE_CHECKING, Dict, Union

from sqlalchemy import (JSON, Boolean, Column, DateTime, ForeignKey, Integer,
                        Numeric, Text)
from sqlalchemy.orm import Mapped

from constants import ColumnType

if TYPE_CHECKING:
    from datetime import datetime


class ColumnDetails():
    @property
    def sql_column_type(self):
        if self.type == ColumnType.TEXT:
            self.type_instance = Text
        elif self.type == ColumnType.NUMBER:
            self.type_instance = Numeric
        elif self.type == ColumnType.INTEGER:
            self.type_instance = Integer
        elif self.type == ColumnType.DATE:
            self.type_instance = DateTime
        elif self.type == ColumnType.BOOLEAN:
            self.type_instance = Boolean
        elif self.type == ColumnType.JSON:
            self.type_instance = JSON
        elif self.type == ColumnType.MEDIA:
            self.type_instance = Text
        elif self.type == ColumnType.RELATION:
            self.type_instance = ForeignKey
        return self.type_instance

    @property
    def column_type(self) -> str:
        return str(self.type)
    
    @property
    def column_name(self) -> str:
        return str(self.name)

    @property
    def column_default(self) -> Union[str, None]:
        if self.default == 'None':
            return None
        return str(self.default)

    @property
    def column_unique(self) -> bool:
        if self.unique == 'True':
            return True
        else:
            return False

    @property
    def column_nullable(self) -> bool:
        if self.nullable == 'True':
            return False
        else:
            return True

    @property
    def column_private(self) -> bool:
        if self.private == 'True':
            return True
        else:
            return False

    @property
    def sqlalchemy_column(self) -> "Mapped[Union[str, int, float, bool, None, Dict, 'datetime']]":
        column = Column(self.column_name, self.sql_column_type, server_default=self.column_default,
                               unique=self.column_unique, nullable=self.column_nullable)
        return column
    
    def __init__(self,
                 column_type: str,
                 column_name: str,
                 column_default: str,
                 column_unique: bool,
                 column_nullable: bool,
                 column_private: bool,
                 ):
        self.type = column_type
        self.name = column_name
        self.default = column_default
        self.unique = column_unique
        self.nullable = column_nullable
        self.private = column_private
