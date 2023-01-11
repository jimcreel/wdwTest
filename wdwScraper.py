import requests
import json
import bitdotio
import psycopg2
import itertools
import os
from twilio.rest import Client
from datetime import datetime
from datetime import date
import csv
import smtplib, ssl
from email.message import EmailMessage

#target site
url='https://disneyland.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=inspire-key-pass,believe-key-pass,enchant-key-pass,imagine-key-pass,dream-key-pass&destinationId=DLR&numMonths=14'
wdwUrl='https://disneyworld.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=disney-incredi-pass,disney-sorcerer-pass,disney-pirate-pass,disney-pixie-dust-pass&destinationId=WDW&numMonths=13'

#open the site
print('opening the reservation site...')
resp=requests.get(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36', "Upgrade-Insecure-Requests": "1","Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language": "en-US,en;q=0.5","Accept-Encoding": "gzip, deflate"})
#print(resp)
wdwResp =requests.get(wdwUrl, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36', "Upgrade-Insecure-Requests": "1","Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language": "en-US,en;q=0.5","Accept-Encoding": "gzip, deflate"})
print(wdwResp)
dates_dict = resp.text
wdwDates=wdwResp.text
parse_json = json.loads(wdwDates)

#Data is separated into a list of calendar availability with 5 elements separated by key level
incredi_avail = parse_json[0]['availabilities']
sorceror_avail = parse_json[1]['availabilities']
pirate_avail = parse_json[2]['availabilities']
pixie_avail = parse_json[3]['availabilities']

print(incredi_avail)