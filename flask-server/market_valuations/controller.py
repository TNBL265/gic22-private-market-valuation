import json
from flask import Blueprint, make_response, request

redshift_blueprint = Blueprint('redshift_api', __name__)


@redshift_blueprint.route("/redshift/market_valuations", methods=['GET', 'POST'])
def market_valuations_data_controller():
    if request.method == 'GET':
        return make_response(json.dumps("Market valuations routes"), 200)
    elif request.method == 'POST':
        pass
    else:
        return make_response(json.dumps("Request type not supported"), 400)
