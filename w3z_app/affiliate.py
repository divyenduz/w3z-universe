class Affiliate:
    def attach_affiliates(self, url=None):
        url = self._attach_flipkart(url)
        url = self._attach_amazon(url)
        return url

    def _attach_flipkart(self, url):
        return self._apply_affiliate_token(['flipkart.com'], 'affid=divyenduzg', url)

    def _attach_amazon(self, url):
        return self._apply_affiliate_token(['amazon.in'], 'tag=divyendusingh-21', url)

    def _apply_affiliate_token(self, affiliate_domains, affiliate_token, url):
        if any(one_domain in url for one_domain in affiliate_domains):
            return url + '&' + affiliate_token if '?' in url else url + '?' + affiliate_token
        else:
            return url
