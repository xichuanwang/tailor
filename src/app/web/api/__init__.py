from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from util.response import InvalidUsage, NotFound
from web.api.business import business_blueprint
from web.api.customer import customer_blueprint
from web.api.purchase import purchase_blueprint


app = Flask(__name__)
app.register_blueprint(business_blueprint)
app.register_blueprint(customer_blueprint)
app.register_blueprint(purchase_blueprint)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/tailor'


@app.errorhandler(NotFound)
@app.errorhandler(InvalidUsage)
def handle_error(error):
    return error.to_response()


db = SQLAlchemy(app)
