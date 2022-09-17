import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from flask import Flask

from config import Config
from database import db
from controller import analytics_blueprint

analytics_app = Flask(__name__)
analytics_app.config.from_object(Config)
analytics_app.register_blueprint(analytics_blueprint)
db.init_app(analytics_app)

if __name__ == "__main__":
    with analytics_app.app_context():
        db.create_all()
    analytics_app.run(host='0.0.0.0', port=5000, debug=False)