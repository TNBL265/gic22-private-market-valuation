import json
from flask import Blueprint, make_response, request

from services import *

market_values_blueprint = Blueprint("market_values_api", __name__)


@market_values_blueprint.route("/market-values/<int:instrumentId>", methods=["GET", "PUT", "POST"])
def market_value_controller(instrumentId):
    if request.method == "GET":
        return make_response(json.dumps(retrieve_market_value_records(instrumentId)), 200)
    elif request.method == "POST":
        data_obj = json.loads(request.data)
        return make_response(json.dumps(create_market_value_records(instrumentId, data_obj)), 200)
    elif request.method == "PUT":
        data_obj = json.loads(request.data)
        return make_response(json.dumps(update_market_value_records(instrumentId, data_obj)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)
