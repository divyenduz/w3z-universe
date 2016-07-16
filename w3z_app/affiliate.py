class Affiliate:
    def attach_affiliates(self, url=None):
        url = self._attach_flipkart(url)
        url = self._attach_amazon(url)
        return url

    def _attach_flipkart(self, url):
        return self._apply_affiliate_token('flipkart.com', 'affid=divyenduzg', url)

    def _attach_amazon(self, url):
        return self._apply_affiliate_token('amazon.in', 'tag=divyendusingh-21', url)

    def _apply_affiliate_token(self, affiliate_domain, affiliate_token, url):
        if affiliate_domain in url:
            return url + '&' + affiliate_token if '?' in url else url + '?' + affiliate_token
        else:
            return url
