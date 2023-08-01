from async_station import create_celery
from config import ProductionConfig
from server_engine import create_app

app = create_app(ProductionConfig)
celery_app = create_celery(app)