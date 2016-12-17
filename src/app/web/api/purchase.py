from json import loads as json_loads
from flask import Blueprint, request

from interfaces import create_purchase, get_purchase, mark_purchase_completed, get_customer

from util.jsonapi import jsonapi
from util.response import InvalidUsage, NotFound
from web.api.constants import API_PREFIX


purchase_blueprint = Blueprint('purchase', __name__, url_prefix=API_PREFIX.format('purchases/'))


@purchase_blueprint.route("/", methods=['GET', 'POST'])
@jsonapi
def purchases():
    if request.method == 'GET':
        return [purchase.serialized(expanded_fields={'customer_id': get_customer}) for purchase in get_purchase()]
    elif request.method == 'POST':
        data = json_loads(request.data)

        required_fields = [
            'customer_id',
            'business_id',
            'total_cost',
        ]

        for field_name in required_fields:
            if field_name not in data:
                raise InvalidUsage(message='Required', field_name=field_name)

        purchase = create_purchase(
            customer_id=data['customer_id'],
            business_id=data['business_id'],
            total_cost=data['total_cost'],
            notify_on_completion=data.get('notify_on_completion'),
            quoted_completion_date=data.get('quoted_completion_date'),
            actual_completion_date=data.get('actual_completion_date')
        )
        return purchase.serialized(expanded_fields={'customer_id': get_customer})


@purchase_blueprint.route("<purchase_id>/", methods=['GET', 'PUT'])
@jsonapi
def purchases_detail(purchase_id):
    purchase = get_purchase(purchase_id)
    if not purchase:
        raise NotFound()

    if request.method == 'GET':
        return purchase.serialized()
    elif request.method == 'PUT':
        data = json_loads(request.data)
        if 'completed' in data and bool(data['completed']):
            mark_purchase_completed(purchase)

        return purchase.serialized(expanded_fields={'customer_id': get_customer})
