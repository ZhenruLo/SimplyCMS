from config import DevelopmentConfig
from init_server import create_app

app = create_app(DevelopmentConfig)

if __name__ == '__main__':
    context = ('./server_asset/server.crt', './server_asset/server.key')
    # socketio.run(app, ssl_context=context, use_reloader=False)
    app.run(host='0.0.0.0', port=5000, use_reloader=False)