from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object("app.config.Config")
db = SQLAlchemy(app)
