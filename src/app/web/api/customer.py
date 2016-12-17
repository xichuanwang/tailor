from json import loads as json_loads
from flask import Blueprint, request

from interfaces import create_customer, get_customer

from util.jsonapi import jsonapi
from util.response import InvalidUsage, NotFound
from web.api.constants import API_PREFIX


customer_blueprint = Blueprint('customer', __name__, url_prefix=API_PREFIX.format('customers/'))


@customer_blueprint.route("/", methods=['GET', 'POST'])
@jsonapi
def customers():
    if request.method == 'GET':
        return [customer.serialized() for customer in get_customer()]
    elif request.method == 'POST':
        data = json_loads(request.data)

        print data

        required_fields = [
            'first_name',
            'last_name',
            'business_id',
        ]

        for field_name in required_fields:
            if field_name not in data:
                raise InvalidUsage(message='Required', field_name=field_name)

        customer = create_customer(
            first_name=data['first_name'],
            last_name=data['last_name'],
            business_id=data['business_id'],
            email=data.get('email'),
            phone_number=data.get('phone_number')
        )
        return customer.serialized()


@customer_blueprint.route("<customer_id>/", methods=['GET'])
@jsonapi
def customers_detail(customer_id):
    customer = get_customer(customer_id)
    if not customer:
        raise NotFound()

    return customer.serialized()
