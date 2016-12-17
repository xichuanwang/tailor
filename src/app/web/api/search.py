from flask import Blueprint


bp = Blueprint('bp', __name__, url_prefix='/api')


@bp.route("/", methods=['GET'])
def home():
    return 'hi'
