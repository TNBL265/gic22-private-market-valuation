import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from flask import Flask

from config import Config
from database import db
from controller import market_values_blueprint


market_values_app = Flask(__name__)
market_values_app.config.from_object(Config)
market_values_app.register_blueprint(market_values_blueprint)
db.init_app(market_values_app)

if __name__ == "__main__":
    with market_values_app.app_context():
        db.create_all()
    market_values_app.run(host='0.0.0.0', port=5002, debug=False)
