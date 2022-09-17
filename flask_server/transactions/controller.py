import json
from flask import Blueprint, make_response, request

from services import *

transactions_blueprint = Blueprint("transactions_api", __name__)


@transactions_blueprint.route("/transactions/<int:transactionId>", methods=["GET", "DELETE"])
def transaction_controller(transactionId):
    if request.method == "GET":
        return make_response(json.dumps(retrieve_a_transaction(transactionId)), 200)
    elif request.method == "DELETE":
        return make_response(json.dumps(delete_a_transaction(transactionId)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)


@transactions_blueprint.route("/transactions", methods=["GET", 'POST'])
def transactions_controller():
    if request.method == "GET":
        return make_response(json.dumps(retrieve_list_of_transactions()), 200)
    elif request.method == "POST":
        data_obj = json.loads(request.data)
        return make_response(json.dumps(create_a_transaction(data_obj)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)


@transactions_blueprint.route("/transactions/instruments/<int:instrumentId>", methods=["GET"])
def transactions_instruments_controller(instrumentId):
    if request.method == "GET":
        return make_response(json.dumps(retrieve_list_of_transactions_on_instrumentId(instrumentId)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)
