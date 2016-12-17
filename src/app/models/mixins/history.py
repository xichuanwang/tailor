from sqlalchemy import Column, DateTime

from util.datetime import utcnow


class HistoryMixin(object):
    created_at = Column(DateTime, nullable=False, default=utcnow)
    updated_at = Column(DateTime, nullable=False, default=utcnow, onupdate=utcnow)
