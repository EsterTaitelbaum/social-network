from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import math

app = Flask(__name__)
CORS(app)

with open('posts.json') as f:
    posts = json.load(f)


posts.sort(key=lambda x: x['created_at'], reverse=True)

for post in posts:
    created_at = datetime.fromisoformat(post['created_at'])
    formatted_date = created_at.strftime('%A, %B %d, %Y')
    post['created_at'] = formatted_date
POSTS_PER_PAGE = 40

@app.route('/api/posts')
def get_posts():
    page = int(request.args.get('page', 1))
    start_idx = (page - 1) * POSTS_PER_PAGE
    end_idx = start_idx + POSTS_PER_PAGE
    return jsonify(posts[start_idx:end_idx])

@app.route('/api/pages')
def get_posts_length():
    return jsonify(math.ceil(len(posts)/POSTS_PER_PAGE))

if __name__ == '__main__':
    app.run(debug=True)