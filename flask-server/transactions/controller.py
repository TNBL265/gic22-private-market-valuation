import json
from flask import Blueprint, make_response, request

dynamo_blueprint = Blueprint('dynamo_api', __name__)


@dynamo_blueprint.route("/dynamo/transactions", methods=['GET', 'POST'])
def transaction_data_controller():
    if request.method == 'GET':
        return make_response(json.dumps("Transactions routes"), 200)
    elif request.method == 'POST':
        pass
    else:
        return make_response(json.dumps("Request type not supported"), 400)
