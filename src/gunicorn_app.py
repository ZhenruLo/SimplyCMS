from config import ProductionConfig
from init_server import create_app

app = create_app(ProductionConfig)
