# w3z-universe
all codebase related to w3z including site, chrome extension, cli

# setup

Copy config.sample.json to config.json and change parameters as required.
In config.json, environment can be maintained as "dev" or "prod", also, accordingly maintain key name "prod"(already maintained in file) as "dev" or "prod" as per the environment defined.

Install the required system dependencies, these instructions are for ubuntu / debian :-

```
sudo apt-get install python python3 python-virtualenv python-pip python3-pip nodejs-legacy npm
npm install -g yarn
export PATH="./node_modules/.bin:$PATH"
```

Setup DB table via (use DB name w3z.db) :-

```
sqlite3 w3z.db

CREATE TABLE "links" (
  "url" varchar(6000) NOT NULL PRIMARY KEY,
  "convertedurl" varchar(90) NOT NULL UNIQUE
);
```

Then, run the following :-

```
virtualenv v -p python3
source v/bin/activate
pip install -r requirements.txt
yarn or npm install
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
