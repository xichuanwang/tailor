from sqlalchemy import Column, ForeignKey, Integer, Date, Boolean

from models.mixins import HistoryMixin, SerializableMixin
from web.api import db


class Purchase(db.Model, HistoryMixin, SerializableMixin):
    id = Column(Integer, primary_key=True)
    customer_id = Column(ForeignKey('customer.id'), nullable=False)
    business_id = Column(ForeignKey('business.id'), nullable=False)
    notify_on_completion = Column(Boolean, nullable=False, default=True)
    quoted_completion_date = Column(Date)
    actual_completion_date = Column(Date)
    total_cost = Column(Integer)

    def __init__(
            self,
            customer_id,
            business_id,
            total_cost,
            notify_on_completion=True,
            quoted_completion_date=None,
            actual_completion_date=None
    ):
        self.customer_id = customer_id
        self.business_id = business_id
        self.total_cost = total_cost
        self.notify_on_completion = notify_on_completion
        self.quoted_completion_date = quoted_completion_date
        self.actual_completion_date = actual_completion_date

    def __repr__(self):
        return '<Order {}: ${}>'.format(self.id, self.total_cost_in_dollars)

    @classmethod
    def get(cls, id=None):
        if id:
            return cls.query.get(id)
        return cls.query.all()

    @classmethod
    def create(
            cls,
            customer_id,
            business_id,
            total_cost,
            quoted_completion_date=None,
            actual_completion_date=None,
            notify_on_completion=True
    ):
        order = cls(
            customer_id=customer_id,
            business_id=business_id,
            total_cost=total_cost,
            quoted_completion_date=quoted_completion_date,
            actual_completion_date=actual_completion_date,
            notify_on_completion=notify_on_completion
        )
        db.session.add(order)
        db.session.commit()
        return order

    def update(self, actual_completion_date=None):
        self.actual_completion_date = actual_completion_date
        db.session.commit()
        return self

    @property
    def total_cost_in_dollars(self):
        return self.total_cost / 100.0
