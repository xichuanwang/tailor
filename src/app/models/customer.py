from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy_utils.types.email import EmailType
from sqlalchemy_utils.types.phone_number import PhoneNumberType

from models.mixins import HistoryMixin, SerializableMixin
from web.api import db


class Customer(db.Model, HistoryMixin, SerializableMixin):
    id = Column(Integer, primary_key=True)
    business_id = Column(ForeignKey('business.id'), nullable=False)
    first_name = Column(String(120))
    last_name = Column(String(120))
    email = Column(EmailType)
    phone_number = Column(PhoneNumberType)

    def __init__(self, first_name, last_name, business_id, email=None, phone_number=None):
        self.first_name = first_name
        self.last_name = last_name
        self.business_id = business_id
        self.email = email
        self.phone_number = phone_number

    def __repr__(self):
        return '<Customer {}: {} {}>'.format(self.id, self.first_name, self.last_name)

    @property
    def full_name(self):
        return '{} {}'.format(self.first_name, self.last_name)

    @classmethod
    def get(cls, id=None):
        if id:
            return cls.query.get(id)
        return cls.query.all()

    @classmethod
    def create(cls, first_name, last_name, business_id, email=None, phone_number=None):
        customer = cls(
            first_name=first_name,
            last_name=last_name,
            business_id=business_id,
            email=email,
            phone_number=phone_number
        )
        db.session.add(customer)
        db.session.commit()
        return customer
