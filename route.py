import json

from flask import Flask, request, redirect, abort, render_template, Response
from db import set_link, get_link, get_promos
from config import get_config
from w3z_app import affiliate, core

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


@app.route('/slack', methods=['GET', 'POST'])
def slack():
    text = request.form.get('text').replace('https://', '').replace('http://', '')
    query = {'protocol':'http://', 'url': text}
    data = json.loads(work(query))
    return Response(json.dumps({'response_type': 'in_channel', 'text': data['u']}), mimetype='application/json')


@app.route('/work', methods=['POST'])
def work(query = None):
    if query is None:
        query = request.get_json()
    url = query['protocol'] + query['url']

    url = affiliate.attach_affiliates(url)

    u = get_link(url, True)
    if u is not None:
        return json.dumps({'u': config['api_endpoint'] + '/' + u})
    else:
        u_hash = core.get_hash(url)
        u = get_link(u_hash)
        while u is not None:
            core.magic += 1
            u_hash = core.get_hash(url)
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
