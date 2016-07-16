import hashlib


class Core:
    magic = 3

    def get_hash(self, url):
        md5 = hashlib.md5()
        md5.update(url.encode('utf-8'))
        u_hash = md5.hexdigest()[:self.magic]

        # Trying to avoid the hash being work or config
        banned_word_list = ['work', 'config', 'p', 'slack']

        while u_hash in banned_word_list:
            self.magic += 1
            u_hash = md5.hexdigest()[:self.magic]

        return u_hash
