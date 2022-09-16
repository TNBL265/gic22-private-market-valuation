from flask import Flask

from config import Config
from controller import rds_blueprint
from model import rds_db


rds_app = Flask(__name__)
rds_app.config.from_object(Config)
rds_app.register_blueprint(rds_blueprint)
rds_db.init_app(rds_app)


if __name__ == '__main__':
    with rds_app.app_context():
        rds_db.create_all()
    rds_app.run(host='0.0.0.0', port=5004, debug=False)
