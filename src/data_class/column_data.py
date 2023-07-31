from typing import TYPE_CHECKING, Dict, Union

from constants import ColumnType
from sqlalchemy import (JSON, Boolean, DateTime, ForeignKey, Integer, Numeric,
                        Text)
from sqlalchemy.orm import relationship

if TYPE_CHECKING:
    from datetime import datetime

class ColumnInfo():
    @property
    def column_type(self):
        if self.type == ColumnType.TEXT:
            self.type_instance = Text
        elif self.type == ColumnType.NUMERIC:
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
    def column_order(self):
        return self.order
    
    @property
    def column_name(self):
        return self.name
    
    @property
    def column_default(self):
        return self.default
    
    @property
    def column_unique(self):
        return self.unique
    
    @property
    def column_nullable(self):
        return self.nullable
    
    @property
    def column_private(self):
        return self.private
    
    def __init__(self, 
                 column_type: str,
                 column_order: int,
                 column_name: str,
                 column_default: Union[str, int, float, bool, None, Dict, 'datetime'],
                 column_unique: bool,
                 column_nullable: bool,
                 column_private: bool,
                 ):
        self.type = column_type
        self.order = column_order
        self.name = column_name
        self.default = column_default
        self.unique = column_unique
        self.nullable = column_nullable
        self.private = column_private