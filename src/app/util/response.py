from flask import jsonify


class ErrorResponse(Exception):
    status_code = 400

    def __init__(self, message, field_name=None, status_code=None):
        Exception.__init__(self)
        self.message = message
        self.field_name = field_name
        if status_code is not None:
            self.status_code = status_code

    def to_response(self):
        key = self.field_name or 'non_field_error'
        response = jsonify({key: self.message})
        response.status_code = self.status_code
        return response


class InvalidUsage(ErrorResponse):

    def __init__(self, message, field_name=None):
        ErrorResponse.__init__(self, message=message, field_name=field_name, status_code=400)


class NotFound(ErrorResponse):

    def __init__(self):
        ErrorResponse.__init__(self, message='Not found', status_code=404)
