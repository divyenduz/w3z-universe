import json
import os

dir_path = os.path.dirname(os.path.abspath(__file__))

def _get_config():
    with open(os.path.join(dir_path, 'config.json'), 'r') as f:
        config_ = json.loads(f.read())
        return json.dumps(config_)


config = json.loads(_get_config())
env = config['env']
debug = True if env == 'dev' else False
config = config[env]


def get_config():
    return config, debug
