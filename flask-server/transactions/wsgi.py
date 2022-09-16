from flask import Flask

from controller import dynamo_blueprint


dynamo_app = Flask(__name__)
dynamo_app.register_blueprint(dynamo_blueprint)

if __name__ == '__main__':
    dynamo_app.run(host='0.0.0.0', port=5003, debug=False)
