import json
from flask import Blueprint, make_response, request

from services import *

instruments_blueprint = Blueprint('instruments_api', __name__)


@instruments_blueprint.route("/instruments", methods=['GET', 'POST'])
def instruments_controller():
    if request.method == 'GET':
        data_list = retrieve_list_of_instruments()
        return make_response(json.dumps(data_list), 200)
    elif request.method == 'POST':
        data_obj = json.loads(request.data)
        data = create_an_instrument(data_obj)
        return make_response(json.dumps(data), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)


@instruments_blueprint.route("/instruments/<int:instrumentId>", methods=['GET', 'PUT', 'DELETE'])
def instrument_controller(instrumentId):
    if request.method == 'GET':
        data = retrieve_an_instrument(instrumentId)
        return make_response(json.dumps(data), 200)
    elif request.method == 'PUT':
        data_obj = json.loads(request.data)
        data = update_an_instrument(instrumentId, data_obj)
        return make_response(json.dumps(data), 200)
    elif request.method == 'DELETE':
        return make_response(json.dumps(delete_an_instrument(instrumentId)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)
