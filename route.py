from flask import Flask, request, redirect, abort, render_template
import json, hashlib
from db import set_link, get_link, get_promos
from config import get_config

config, debug = get_config()

app = Flask(__name__)


@app.errorhandler(404)
def not_found(error):
    app.logger.error(error)
    return "What are you looking for ? 404!"


@app.route('/')
def index():
    promo_list = get_promos()
    return render_template('index.html', promo_list=promo_list)


@app.route('/work', methods=['POST'])
def work():
    query = request.get_json()
    url = query['protocol'] + query['url'];
    u = get_link(url, True)
    if u is not None:
        return json.dumps({'u': config['api_endpoint'] + '/' + u})
    else:
        magic = 3
        md5 = hashlib.md5()
        md5.update(url.encode('utf-8'))
        u_hash = md5.hexdigest()[:magic]

        # Trying to avoid the hash being work or config
        banned_word_list = ['work', 'config', 'p']

        while (u_hash in banned_word_list):
            magic += 1
            u_hash = md5.hexdigest()[:magic]

        u = get_link(u_hash)

        while u is not None:
            magic += 1
            md5.update(url.encode('utf-8'))
            u_hash = md5.hexdigest()[:magic]

            while (u_hash in banned_word_list):
                magic += 1
                u_hash = md5.hexdigest()[:magic]

            u = get_link(u_hash)

        set_link(url, u_hash)

        return json.dumps({'u': config['api_endpoint'] + '/' + u_hash})


@app.route('/privacy', methods=['GET'])
def privacy():
    return render_template('privacy.html')


@app.route('/<slug>', methods=['GET'])
def open_link(slug=None):
    link = get_link(slug)

    if link is not None:
        print(link)
        return redirect(link, code=301)
    else:
        abort(404)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=debug)
