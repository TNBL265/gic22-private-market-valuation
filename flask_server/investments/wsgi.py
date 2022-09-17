import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from flask import Flask

from config import Config
from database import db
from controller import investments_blueprint

investments_app = Flask(__name__)
investments_app.config.from_object(Config)
investments_app.register_blueprint(investments_blueprint)
db.init_app(investments_app)

if __name__ == "__main__":
    with investments_app.app_context():
        db.create_all()
    investments_app.run(host='0.0.0.0', port=5000, debug=False)