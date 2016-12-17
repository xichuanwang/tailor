from pinject import new_object_graph
from service.twilio import TwilioService

obj_graph = new_object_graph(modules=None, classes=[TwilioService])
twilio_service = obj_graph.provide(TwilioService)
