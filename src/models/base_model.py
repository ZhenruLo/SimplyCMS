from typing import List

from flask_login import UserMixin
from flask_migrate import migrate, upgrade
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Table

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

def create_table(tablename):
    attr_dict = {'__tablename__': tablename,
                 'myfirstcolumn': db.Column(db.Integer, primary_key=True),
                 'mysecondcolumn': db.Column(db.Integer)}

    type('mytableclass', (db.Model,), attr_dict)
    migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())

def update_table(tablename):
    Table(tablename, db.metadata, 
                  Column("extra_column", String(255)),
                  extend_existing=True)
    migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())

def get_tables_information():
    tables = db.metadata.tables
    return tables
