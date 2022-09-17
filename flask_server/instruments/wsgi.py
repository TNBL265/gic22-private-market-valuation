import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from flask import Flask

from config import Config
from controller import instruments_blueprint
from model import instruments_db


instruments_app = Flask(__name__)
instruments_app.config.from_object(Config)
instruments_app.register_blueprint(instruments_blueprint)
instruments_db.init_app(instruments_app)


if __name__ == '__main__':
    with instruments_app.app_context():
        instruments_db.create_all()
    instruments_app.run(host='0.0.0.0', port=5001, debug=False)
