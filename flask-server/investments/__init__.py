from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from .config import Config
from .controller import rds_blueprint


rds_app = Flask(__name__)
rds_app.config.from_object(Config)
rds_app.register_blueprint(rds_blueprint)
rds_db = SQLAlchemy(rds_app)


