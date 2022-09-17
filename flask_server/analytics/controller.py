import json
from flask import Blueprint, make_response, request

from services import *

analytics_blueprint = Blueprint("analytics_api", __name__)


@analytics_blueprint.route("/analytics/investments/<int:investmentId>/total-market-values", methods=["GET"])
def view_total_market_values_by_investment(investmentId):
    if request.method == "GET":
        args = request.args
        start = args.get('start')
        end = args.get('end')
        if not start or not end:
            return make_response(json.dumps("Date range not specified"), 400)
        return make_response(json.dumps(retrieve_total_market_values(start, end, investmentId)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)


@analytics_blueprint.route("/analytics/investments/pnl", methods=["GET"])
def view_all_pnl_breakdown():
    if request.method == "GET":
        args = request.args
        date = args.get('date')
        if not date:
            return make_response(json.dumps("Date not specified"), 400)
        return make_response(json.dumps(retrieve_all_pnl_breakdown(date)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)


@analytics_blueprint.route("/analytics/investments/<int:investmentId>/pnl", methods=["GET"])
def view_single_pnl_breakdwon(investmentId):
    if request.method == "GET":
        args = request.args
        start = args.get('start')
        end = args.get('end')
        if not start or not end:
            return make_response(json.dumps("Date range not specified"), 400)
        return make_response(json.dumps(retrieve_single_pnl_breakdown(start, end, investmentId)), 200)
    else:
        return make_response(json.dumps("Request type not supported"), 400)