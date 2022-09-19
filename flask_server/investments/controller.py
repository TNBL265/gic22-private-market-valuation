import json
from flask import Blueprint, make_response, request

from .services import *

investments_blueprint = Blueprint("investments_api", __name__)


@investments_blueprint.route("/investments/<int:instrumentId>", methods=["GET", "POST"])
def investments_controller(instrumentId):
    if request.method == "GET":
        return make_response(json.dumps(retrieve_all_investments(instrumentId)), 200)
    elif request.method == "POST":
        return make_response(json.dumps(refresh_all_investments(instrumentId)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)