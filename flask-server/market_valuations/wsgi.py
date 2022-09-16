from flask import Flask

from .controller import redshift_blueprint


redshift_app = Flask(__name__)
redshift_app.register_blueprint(redshift_blueprint)
