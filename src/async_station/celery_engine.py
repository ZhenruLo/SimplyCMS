from celery import Celery, Task
from flask import Flask


def create_celery(app: Flask):
    class FlaskTask(Task):
        def __call__(self, *args: object, **kwargs: object) -> object:
            with app.app_context():
                return self.run(*args, **kwargs)
    
    celery_app = Celery(app.name, task_cls=FlaskTask, result_extended=True)
    celery_app.config_from_object(app.config["CELERY"])
    celery_app.set_default()
    return celery_app
