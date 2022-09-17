import json
from flask import Blueprint, make_response, request
from datetime import datetime

from model import insert_one_instrument_data, get_instrument_data

instruments_blueprint = Blueprint('instruments_api', __name__)


@instruments_blueprint.route("/instruments", methods=['GET', 'POST'])
def instrument_data_controller():
    if request.method == 'GET':
        date: str = request.args.get('date')
        if not date:
            return make_response("Missing argument(s) or argument(s) is empty", 400)

        data_list = get_instrument_data(datetime.strptime(date, '%Y-%m-%d %H:%M:%S'))
        return make_response(json.dumps(data_list), 200)

    elif request.method == 'POST':
        data_obj = json.loads(request.data)
        insert_one_instrument_data(data_obj)
        return make_response(json.dumps("Inserted"), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)
