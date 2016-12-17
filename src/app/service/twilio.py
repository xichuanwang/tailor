from __future__ import absolute_import

from twilio.rest import TwilioRestClient

from configuration.config import get_config


class TwilioService(object):
    def __init__(self):
        config = get_config()
        credentials = config['app']['api']['twilio']
        self.client = TwilioRestClient(
            credentials['account_sid'],
            credentials['auth_token']
        )

    def notify_customer_of_purchase_completion(self, customer_phone_number, customer_name, business_name):
        self._send_text_message(
            customer_phone_number,
            'Hey {}! Your order from {} has been completed. Please feel to pick up whenever you are ready.'.format(
                customer_name, business_name
            )
        )

    def _send_text_message(self, phone_number, message):
        self.client.messages.create(
            to=phone_number,
            from_="+14692754892",
            body=message
        )
