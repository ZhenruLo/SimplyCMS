
from typing import TYPE_CHECKING, Dict, Union

from flask_login import UserMixin
from flask_migrate import migrate, upgrade
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Boolean, Column, Integer, Numeric, String, Table, Text

from constants import ColumnType, Directory

if TYPE_CHECKING:
    from sqlalchemy.engine.row import Row
db = SQLAlchemy()

class Base(UserMixin):
    @classmethod
    def add(cls, **kwargs):
        obj = cls(**kwargs)
        db.session.add(obj)
        db.session.commit()

    @classmethod
    def delete(cls, row):
        db.session.delete(row)
        db.session.commit()
    
    @classmethod
    def update(cls, cls_column_name: str, value: str, update_attr: Dict[str, Union[str, int, bool, dict]]):
        db.session.query(cls).filter(cls_column_name == value).update(update_attr)
        db.session.commit()

    @classmethod
    def fetch_one_filter(cls, cls_column_name: str, value, *required_args: str):
        return db.session.query(*required_args).filter(cls_column_name == value).first()

    @classmethod
    def fetch_all(cls, *required_args: str):
        return db.session.query(*required_args).all()

    @classmethod
    def fetch_all_filter(cls, cls_column_name: 'str', value, *required_args: str):
        return db.session.query(*required_args).filter(cls_column_name == value).all()
    
    @classmethod
    def to_dict(cls):
        return {field.name:getattr(cls, field.name) for field in cls.__table__.c}
    
def create_table(tablename: str) -> bool:
    Table(tablename, 
          db.metadata,
          Column('id', Integer, primary_key=True),
          )
    migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())

def remove_table(tablename: str):
    selected_table = db.metadata.tables.get(tablename)
    if selected_table is not None:
        selected_table.drop(db.engine)
        __refresh_metadata()

def update_table_content(tablename: str, column_info: str, column_var_type: str):
    if column_var_type == ColumnType.NUMBER:
        column_attr = Numeric
    elif column_var_type == ColumnType.STRING:
        column_attr = String(255)
    elif column_var_type == ColumnType.TEXT:
        column_attr = Text
    elif column_var_type == ColumnType.BOOLEAN:
        column_attr = Boolean
        
    Table(tablename, 
          db.metadata, 
          Column(column_info, column_attr),
          extend_existing=True,
          )
    migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())

def get_all_tables_information():
    tables = db.metadata.tables
    return tables

def __refresh_metadata():
    db.metadata.clear()
    db.metadata.reflect(db.engine)