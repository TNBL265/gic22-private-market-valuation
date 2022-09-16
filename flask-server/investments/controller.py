import json
from flask import Blueprint, make_response, request

rds_blueprint = Blueprint('rds_api', __name__)


@rds_blueprint.route("/rds/investments", methods=['GET', 'POST'])
def investment_data_controller():
    if request.method == 'GET':
        return make_response(json.dumps("Investments routes"), 200)
    elif request.method == 'POST':
        pass
    else:
        return make_response(json.dumps("Request type not supported"), 400)


# from datetime import datetime
#
# from .models import get_investment_data, insert_investment_data
# def investment_data_controller():
#     if request.method == 'GET':
#         date: str = request.args.get('date')
#         if not date:
#             return make_response("Missing argument(s) or argument(s) is empty", 400)
#
#         data_list = get_investment_data(datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
#         return make_response(json.dumps(data_list), 200)
#
#     elif request.method == 'POST':
#         data_obj = json.loads(request.data)
#         insert_count = insert_investment_data(data_obj)
#         return make_response(json.dumps(insert_count), 200)
#
#     else:
#         return make_response(json.dumps("Request type not supported"), 400)
