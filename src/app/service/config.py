from configuration.config import get_config


class ConfigService(object):
    def __init__(self):
        self.config = get_config()
