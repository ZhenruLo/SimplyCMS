from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect

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
    def update(cls, cls_column_name, value: str, update_attr):
        db.session.query(cls).filter(cls_column_name == value).update(update_attr)
        db.session.commit()

    @classmethod
    def fetch_one_filter(cls, cls_column_name, value, *required_args):
        return db.session.query(*required_args).filter(cls_column_name == value).first()

    @classmethod
    def fetch_all(cls, *required_args):
        return db.session.query(*required_args).all()

    @classmethod
    def fetch_all_filter(cls, cls_column_name, value, *required_args):
        return db.session.query(*required_args).filter(cls_column_name == value).all()
    
    @classmethod
    def to_dict(cls):
        return {
            column.key: getattr(cls, column.key)
            for column in inspect(cls).mapper.column_attrs
        }