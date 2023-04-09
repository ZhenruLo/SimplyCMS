from config import Config
from init_server import create_app

app = create_app(Config)

if __name__ == "__main__":
    context = ('./server_asset/server.crt', './server_asset/myserver.key')
    # socketio.run(app, host='10.0.0.140', port=443, ssl_context=context, use_reloader=False)
    # socketio.run(app, ssl_context=context, use_reloader=False)
    # socketio.run(app, use_reloader=False)
    app.run(use_reloader=False)