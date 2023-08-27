from flask import Flask, jsonify
from flask_cors import CORS
import get_dependents

app = Flask(__name__)
CORS(app) 

@app.route('/api/get-dependents', methods=['GET'])
def get_dependents_api():
    repos = get_dependents.get_dependent_repos()
    return jsonify(repos)

if __name__ == '__main__':
    app.run(port=5000)
