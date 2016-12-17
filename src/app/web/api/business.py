from flask import Blueprint, request

from interfaces import create_business, get_business

from util.jsonapi import jsonapi
from util.response import InvalidUsage, NotFound
from web.api.constants import API_PREFIX


business_blueprint = Blueprint('business', __name__, url_prefix=API_PREFIX.format('businesses/'))


@business_blueprint.route("/", methods=['GET', 'POST'])
@jsonapi
def businesses():
    if request.method == 'GET':
        return [business.serialized() for business in get_business()]
    elif request.method == 'POST':
        data = request.form
        if 'name' not in data:
            raise InvalidUsage(message='Required', field_name='name')

        business = create_business(data['name'])
        return business.serialized()


@business_blueprint.route("<business_id>/", methods=['GET'])
@jsonapi
def businesses_detail(business_id):
    business = get_business(business_id)
    if not business:
        raise NotFound()

    return business.serialized()
