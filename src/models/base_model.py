from typing import List

from constants import Directory
from flask_login import UserMixin
from flask_migrate import migrate, upgrade
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Table

db = SQLAlchemy()

class Base(UserMixin):
    @classmethod
    def add(cls, **kwargs):
        obj = cls(**kwargs)
        db.session.add(obj)
        db.session.commit()

    @classmethod
    def delete(cls, user: List):
        db.session.delete(user)
        db.session.commit()
    
    @classmethod
    def to_dict(cls):
        return {field.name:getattr(cls, field.name) for field in cls.__table__.c}
    
def create_table(tablename: str):
    if tablename in db.metadata.tables.keys():
        return False
    
    Table(tablename, 
          db.metadata,
          Column('id', Integer, primary_key=True),
          )
    migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    return True

def update_table_content(tablename: str, column_info):
    Table(tablename, 
          db.metadata, 
          Column(column_info, String(255)),
          extend_existing=True
          )
    migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())

def get_tables_information():
    tables = db.metadata.tables
    return tables
