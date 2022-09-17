import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from flask import Flask

from config import Config
from database import db
from controller import transactions_blueprint


transactions_app = Flask(__name__)
transactions_app.config.from_object(Config)
transactions_app.register_blueprint(transactions_blueprint)
db.init_app(transactions_app)

if __name__ == "__main__":
    with transactions_app.app_context():
        db.create_all()
    transactions_app.run(host='0.0.0.0', port=5000, debug=False)
