class Affiliate:
    def attach_affiliates(self, config, url = None):
        if 'affiliates' in config and isinstance(config['affiliates'], list):
            affiliate_data = config['affiliates']
        else:
            affiliate_data = []

        for item in affiliate_data:
            url = self._apply_affiliate_token(item['urls'], item['tag'], url)
        return url

    def _apply_affiliate_token(self, affiliate_domains, affiliate_token, url):
        if any(one_domain in url for one_domain in affiliate_domains):
            return url + '&' + affiliate_token if '?' in url else url + '?' + affiliate_token
        else:
            return url
