
from .main import db

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(128), unique=True, nullable=False)
    title = db.Column(db.String(128), unique=True, nullable=False)
    slug = db.Column(db.String(128), unique=True, nullable=False)

    def __init__(self, key, title, slug):
        self.key = key
        self.title = title
        self.slug = slug