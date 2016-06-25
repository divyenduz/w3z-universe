import json

def _get_config():
    with open('config.json', 'r') as f:
        config = json.loads(f.read())
        return json.dumps(config)

config = json.loads(_get_config())
env = config['env']
debug = True if env == 'dev' else False
config = config[env]

def get_config():
    return config, debug
