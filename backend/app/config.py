import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    # SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "breakit")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    YRAP_JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "breakit")

