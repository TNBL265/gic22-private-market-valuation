from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from .controller import dynamo_blueprint


dynamo_app = Flask(__name__)
dynamo_app.register_blueprint(dynamo_blueprint)
