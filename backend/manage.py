from uuid import uuid4

from flask.cli import FlaskGroup

from app import app
from app.models import db, Project

cli = FlaskGroup(app)


def gen_key():
    return str(uuid4()).replace('-', '&')


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    print('all created')
    db.session.commit()

@cli.command("seed_db")
def seed_db():
    data = [
        {'id': 1, 'key': gen_key(), 'title': 'First Project', 'slug': 'first_project'},
        {'id': 2, 'key': gen_key(), 'title': 'another', 'slug': 'anther_project'},
        {'id': 3, 'key': gen_key(), 'title': 'Go to buy stuff', 'slug': 'go_shop'},
    ]
    for value in data:
        db.session.add(Project(key=value['key'], title=value['title'], slug=value['slug']))
    db.session.commit()

if __name__ == '__main__':
    cli()