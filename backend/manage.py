from uuid import uuid4

from flask.cli import FlaskGroup

from app import app
from app.models import db, Project, Action

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
        {'id': 1, 'key': gen_key(), 'title': 'First Project',
         'slug': 'first_project'},
        {'id': 2, 'key': gen_key(), 'title': 'Another', 'slug': 'anther_project'},
        {'id': 3, 'key': gen_key(), 'title': 'Go to buy stuff', 'slug': 'go_shop'},
    ]
    for value in data:
        value['down_when'] = f"'{value['title']}' will be done when... it's finished"
        db.session.add(
            Project(key=value['key'], title=value['title'], slug=value['slug'], done_when=value['down_when']))
    db.session.commit()
    another_action = [
        {'id': 1, 'key': gen_key(), 'description': 'Buy milk',
         'date_added': '2020-01-01', 'done': False, 'this_week': True},
    ]
    for value in another_action:
        db.session.add(
            Action(project_id=2, key=value['key'], description=value['description'],
                   date_added=value['date_added'], done=value['done'], this_week=value['this_week']))
    db.session.commit()



if __name__ == '__main__':
    cli()
