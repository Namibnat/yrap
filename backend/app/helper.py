"""Basic helpers for the app."""

import re
from uuid import uuid4

import datetime
from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from .config import Config

app = Flask(__name__)
app.config.from_object("app.config.Config")
app.config["JWT_SECRET_KEY"] = Config.YRAP_JWT_SECRET_KEY
jwt = JWTManager(app)
db = SQLAlchemy(app)


class HTTP:
    """HTTP status codes."""
    h400 = 400  # Bad Request
    h404 = 404
    h401 = 401  # Unauthorized
    h403 = 403  # Forbidden
    h500 = 500
    h200 = 200
    h201 = 201


class Helpers:
    @staticmethod
    def clean_slug(slug):
        regex = re.compile(r'\W+')
        return regex.sub('_', slug)

    @staticmethod
    def gen_key():
        return uuid4().hex

    @staticmethod
    def response_helper(payload, http_status):
        response = make_response(payload, http_status)
        response.headers['Content-Type'] = 'application/json'
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    @staticmethod
    def error_helper(payload, http_status):
        return Helpers.response_helper(payload, http_status)

    @staticmethod
    def get_helper(payload):
        return Helpers.response_helper(payload, HTTP.h200)
