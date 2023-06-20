import random
import string
from typing import List

from flask_login import UserMixin
from flask_migrate import migrate, upgrade
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Table

from constants import Directory

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
    def fetch_one(cls, cls_column_name: 'str', value, *required_args: List['str']):
        return db.session.query(*required_args).filter(cls_column_name == value).first()

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

def update_table_content(tablename: str, column_info):
    Table(tablename, 
          db.metadata, 
          Column(column_info, String(255)),
          extend_existing=True
          )
    migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())

def get_all_tables_information():
    tables = db.metadata.tables
    return tables

def create_table_name() -> str:
    table_uid = __generate_table_uid()
    
    if table_uid in db.metadata.tables.keys():
        create_table_name()
    else:
        return table_uid
    
def __generate_table_uid() -> str:
    random_letters = ''.join(random.choice(string.ascii_lowercase) for i in range(3))
    random_numbers = random.randint(100, 999)
    table_uid = random_letters + str(random_numbers)
    return table_uid