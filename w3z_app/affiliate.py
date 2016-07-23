class Affiliate:
    def attach_affiliates(self, url=None):
        affiliate_data = [
            {
                'name': 'Flipkart',
                'urls': ['flipkart.com'],
                'tag': 'affid=divyenduzg'
            },
            {
                'name': 'Amazon',
                'urls': ['amazon.in', 'amazon.com'],
                'tag': 'tag=divyendusingh-21'
            }
        ]

        for item in affiliate_data:
            url = self._apply_affiliate_token(item['urls'], item['tag'], url)
        return url

    def _apply_affiliate_token(self, affiliate_domains, affiliate_token, url):
        if any(one_domain in url for one_domain in affiliate_domains):
            return url + '&' + affiliate_token if '?' in url else url + '?' + affiliate_token
        else:
            return url
