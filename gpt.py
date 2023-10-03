from flask import Flask, request
import g4f

app = Flask(__name__)


@app.route('/process', methods=['POST'])
def process():
    message = request.form.get('message')
    print(f"Received message: {message}")
    processed_message = gen(message)
    return processed_message


def gen(message):
    # response = g4f.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=[{"role": "user", "content": message}],
    # )
    # return response
    return 'hello'+message


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

import g4f


# def gen(message):
#     response = g4f.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=[{"role": "user", "content": message}],
#     )
#     return response
