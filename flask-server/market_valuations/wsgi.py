from flask import Flask

from controller import redshift_blueprint


redshift_app = Flask(__name__)
redshift_app.register_blueprint(redshift_blueprint)

if __name__ == '__main__':
    redshift_app.run(host='0.0.0.0', port=5002, debug=False)
