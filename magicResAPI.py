import requests
import json
from flask import Flask
from flask_restful import Api, Resource
app = Flask(__name__)
api = Api(app)

#api to return DLR availability
class DLR(Resource):
           
        def get(userResort: str):
            url = 'https://disneyland.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=inspire-key-pass,believe-key-pass,enchant-key-pass,imagine-key-pass,dream-key-pass&destinationId=DLR&numMonths=14'
            data = requests.get(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36', "Upgrade-Insecure-Requests": "1","Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language": "en-US,en;q=0.5","Accept-Encoding": "gzip, deflate"})
            dataText = data.text
            dataParsed = json.loads(dataText)
            
            return dataParsed, 200
            
            
class WDW(Resource):
           
        def get(userResort: str):
            url = 'https://disneyworld.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=disney-incredi-pass,disney-sorcerer-pass,disney-pirate-pass,disney-pixie-dust-pass&destinationId=WDW&numMonths=13'
            data = requests.get(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36', "Upgrade-Insecure-Requests": "1","Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language": "en-US,en;q=0.5","Accept-Encoding": "gzip, deflate"})
            dataText = data.text
            dataParsed = json.loads(dataText)    
            return dataParsed, 200

api.add_resource(DLR, "/DLR")
api.add_resource(WDW, "/WDW")
if __name__ == '__main__':
    app.run(debug=True)