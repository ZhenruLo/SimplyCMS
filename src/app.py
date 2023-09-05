from async_station import create_celery, socketio
from config import DevelopmentConfig
from server_engine import create_app

flask_app = create_app(DevelopmentConfig)
celery_app = create_celery(flask_app)

if __name__ == '__main__':
    context = ('./server_asset/server.crt', './server_asset/server.key')
    socketio.run(flask_app, host='localhost', port=5000)