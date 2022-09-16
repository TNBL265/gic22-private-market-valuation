from flask import Flask

from .controller import dynamo_blueprint


dynamo_app = Flask(__name__)
dynamo_app.register_blueprint(dynamo_blueprint)
