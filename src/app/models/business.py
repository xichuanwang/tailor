from sqlalchemy import Column, Integer, String

from models.mixins import HistoryMixin, SerializableMixin
from web.api import db


class Business(db.Model, HistoryMixin, SerializableMixin):
    id = Column(Integer, primary_key=True)
    name = Column(String(120))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Business {}: {}>'.format(self.id, self.name)

    @classmethod
    def get(cls, id=None):
        if id:
            return cls.query.get(id)
        return cls.query.all()

    @classmethod
    def create(cls, name):
        business = cls(name=name)
        db.session.add(business)
        db.session.commit()
        return business
