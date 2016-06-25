import sqlite3


def _get_conn():
    return sqlite3.connect('w3z.db')


def set_link(url, slug):
    # app.logger.info("url: ", url, " slug: ", slug)
    conn = _get_conn()
    c = conn.cursor()
    c.execute("INSERT INTO LINKS VALUES(?, ?)", (url, slug))
    conn.commit()
    conn.close()
    return True


def get_link(slug=None, short=False):
    if slug is None:
        return None

    # app.logger.info("slug", slug)
    conn = _get_conn()
    c = conn.cursor()
    table = 'URL' if short else 'CONVERTEDURL'
    c.execute("SELECT * FROM LINKS WHERE " + table + "=?", (slug,))
    data = c.fetchone()
    # app.logger.info("data: ", data)
    conn.close()
    if data is not None:
        return data[1] if short else data[0]
    else:
        # app.logger.error("data was None")
        return None


def get_promos():
    return [
        {
            'title': 'DigitalOcean.com',
            'url': "https://www.digitalocean.com/?refcode=efabde48fb30",
            'description': "Host your application on SSD servers",
        },

        {
            'title': 'Uber.com',
            'url': "https://www.uber.com/invite/ubercode17",
            'description': "Transportation in minutes with Uber",
        },
    ]