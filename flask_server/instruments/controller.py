import json
from flask import Blueprint, make_response, request

from services import *

instruments_blueprint = Blueprint("instruments_api", __name__)


@instruments_blueprint.route("/instruments", methods=["GET", "POST"])
def instruments_controller():
    if request.method == "GET":
        return make_response(json.dumps(retrieve_list_of_instruments()), 200)
    elif request.method == "POST":
        data_obj = json.loads(request.data)
        data = data_obj["data"]
        return make_response(json.dumps(create_an_instrument(data)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)


@instruments_blueprint.route("/instruments/upload", methods=["POST"])
def instruments_upload_controller():
    if request.method == "POST":
        data_obj = json.loads(request.data)
        data = data_obj["data"]
        return make_response(json.dumps(mass_create_instruments(data)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)


@instruments_blueprint.route("/instruments/<int:instrumentId>", methods=["GET", "PUT", "DELETE"])
def instrument_controller(instrumentId):
    if request.method == "GET":
        return make_response(json.dumps(retrieve_an_instrument(instrumentId)), 200)
    elif request.method == "PUT":
        data_obj = json.loads(request.data)
        return make_response(json.dumps(update_an_instrument(instrumentId, data_obj)), 200)
    elif request.method == "DELETE":
        return make_response(json.dumps(delete_an_instrument(instrumentId)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)
