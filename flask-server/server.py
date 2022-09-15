from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)


class Instruments(Resource):
    def get(self):
        return {"instruments": ["shares", "debt"]}


api.add_resource(Instruments, '/instruments')

if __name__ == '__main__':
    app.run(debug=True)
