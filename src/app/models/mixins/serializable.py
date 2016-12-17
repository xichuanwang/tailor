from sqlalchemy import DateTime, Date, ForeignKey
from sqlalchemy_utils import PhoneNumberType

from collections import OrderedDict


class SerializableMixin(object):
    def serialized(self, expanded_fields=None):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            obj_key = key
            value_type = type(self.__mapper__.c[key].type)
            value = getattr(self, key)
            if (value_type == DateTime or value_type == Date) and value:
                value = value.isoformat()
            elif value_type == PhoneNumberType and value:
                value = value.e164
            elif expanded_fields and key in expanded_fields.keys():
                value = expanded_fields[key](value).serialized()
                obj_key = key.replace('_id', '')
            result[obj_key] = value
        return result
