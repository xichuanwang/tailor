from context.context import twilio_service
from util.datetime import utcnow


def get_business(id=None):
    from models import Business

    return Business.get(id)


def create_business(name):
    from models import Business

    return Business.create(name)


def get_customer(id=None):
    from models import Customer

    return Customer.get(id)


def create_customer(
        first_name,
        last_name,
        business_id,
        email=None,
        phone_number=None
):
    from models import Customer

    return Customer.create(
        first_name=first_name,
        last_name=last_name,
        business_id=business_id,
        email=email,
        phone_number=phone_number
    )


def get_purchase(id=None):
    from models import Purchase

    return Purchase.get(id)


def mark_purchase_completed(purchase):
    if purchase.notify_on_completion and not purchase.actual_completion_date:
        customer = get_customer(purchase.customer_id)
        business = get_business(purchase.business_id)
        if customer.phone_number:
            twilio_service.notify_customer_of_purchase_completion(
                customer_phone_number=customer.phone_number.e164,
                customer_name=customer.full_name,
                business_name=business.name
            )
    purchase.update(utcnow())


def create_purchase(
        customer_id,
        business_id,
        total_cost,
        notify_on_completion,
        quoted_completion_date,
        actual_completion_date
):
    from models import Purchase

    return Purchase.create(
        customer_id=customer_id,
        business_id=business_id,
        total_cost=total_cost,
        notify_on_completion=notify_on_completion,
        quoted_completion_date=quoted_completion_date,
        actual_completion_date=actual_completion_date
    )
