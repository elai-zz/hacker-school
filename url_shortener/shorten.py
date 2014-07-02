from flask import Flask
from flask import request
app = Flask(__name__)
from flask import redirect
urlMap = {}

# accept post requests
# usage:  curl -d "" http://127.0.0.1:5000/?url=urltoshorten

@app.route('/',defaults ={'path': ''}, methods=['POST', 'GET'])
@app.route('/<path:path>')
def changeURL(path):
    if request.method == "POST":
        longUrl = str(request.args.getlist('url'))
        res = updateMap(longUrl)
        return "The short url is http://127.0.0.1:5000/" + res + "\n"
    else:
        shortURL = path
        if urlMap.has_key(shortURL):
            return redirect(urlMap[shortURL], code=302)
        else:
            return "We don't know the URL"

# function for populating map with current info in links.txt
def readLinks():
    f = open('links.txt', 'r')
    line = f.readline()
    while (line != ""):
        pair = line.split(",")
        urlMap[pair[0]] = pair[1].rstrip()
        urlMap[pair[1].rstrip()] = pair[0]
        line = f.readline()
    f.close()
        
# function for generating the short url
def generateURL(url):
    return str(len(urlMap)+1)
    
# function for updating map and text file
def updateMap(longL):
    shortL = generateURL(longL)
    longL = str(longL[3:])
    longL = longL[:-2]
    urlMap[longL] = shortL
    urlMap[shortL] = longL
    f = open('links.txt', 'a')
    f.write(longL + "," + shortL+"\n")
    f.close()
    return shortL
  

if __name__ == '__main__':
    readLinks()
    app.run()