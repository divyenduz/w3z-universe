import sqlite3


class DB:
    def _get_conn(self):
        return sqlite3.connect('w3z.db')

    def set_link(self, url, slug):
        conn = self._get_conn()
        c = conn.cursor()
        c.execute("INSERT INTO LINKS VALUES(?, ?)", (url, slug))
        conn.commit()
        conn.close()
        return True

    def get_link(self, slug=None, short=False):
        if slug is None:
            return None

        conn = self._get_conn()
        c = conn.cursor()
        table = 'URL' if short else 'CONVERTEDURL'
        c.execute("SELECT * FROM LINKS WHERE " + table + "=?", (slug,))
        data = c.fetchone()
        conn.close()
        if data is not None:
            return data[1] if short else data[0]
        else:
            return None
        
