from flask import Flask
from web.api.search import bp


app = Flask(__name__)

app.register_blueprint(bp)
