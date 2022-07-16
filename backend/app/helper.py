"""Basic helpers for the app."""

import re
from uuid import uuid4
from .main import make_response


class HTTP:
    h404 = 404
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
    def error_helper(payload):
        return Helpers.response_helper(payload, HTTP.h500)

    @staticmethod
    def get_helper(payload):
        return Helpers.response_helper(payload, HTTP.h200)
