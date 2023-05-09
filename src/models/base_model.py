from typing import List

from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, Table, Column, String

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

def create_model(tablename):
    attr_dict = {'__tablename__': tablename,
                 'myfirstcolumn': db.Column(db.Integer, primary_key=True),
                 'mysecondcolumn': db.Column(db.Integer)}

    myclass = type('mytableclass', (db.Model,), attr_dict)
    db.create_all()

def update_model(tablename):
    Table(tablename, db.metadata, 
                  Column("extra_column", String(255)),
                  extend_existing=True)
    db.metadata.create_all(db.engine)