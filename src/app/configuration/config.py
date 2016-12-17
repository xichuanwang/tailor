from yaml import load


def get_config():
    config_file = file('configuration/local.yaml', 'r')
    return load(config_file)
