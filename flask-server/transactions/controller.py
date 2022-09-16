import json
from flask import Blueprint, make_response, request

from model import get_all_transactions, insert_one_transaction

dynamo_blueprint = Blueprint('dynamo_api', __name__)


@dynamo_blueprint.route("/dynamo/transactions", methods=['GET', 'POST'])
def transaction_data_controller():
    if request.method == 'GET':
        return make_response(get_all_transactions(), 200)
    elif request.method == 'POST':
        data_obj = json.loads(request.data)
        insert_one_transaction(data_obj)
        return make_response(json.dumps("Insert successful"), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)
