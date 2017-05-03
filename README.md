# w3z-universe
all codebase related to w3z including site, chrome extension, cli

# setup

Copy config.sample.json to config.json and change parameters as required.
Environment can be "dev" or "prod"

Install the required system dependencies, these instructions are for ubuntu / debian :-

```
sudo apt-get install python python-virtualenv python-pip nodejs-legacy npm
sudo npm install -g yarn webpack
```

Then, run the following :-

```
virtualenv v
source v/bin/activate
pip install -r requirements
yarn
webpack
python route.py
```

# features

- Custom ads
    - Show custom ads on homepage that have a title, link and desctiption. See
    `config.json`
- Custom affiliates
    - You can provide affiliate configuration to auto attach affiliate id with
    certain URLs, see `config.json`
- Google analytics integration
    - Integrate main events with GA just by adding one line to `config.json`

# sites powered by this codebase

- https://w3z.in
- https://f3w.in
