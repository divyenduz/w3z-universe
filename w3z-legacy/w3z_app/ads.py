class Ads:
    def get_promos(self, config):
        if 'ads' in config and isinstance(config['ads'], list):
            return config['ads']
        else:
            return []
