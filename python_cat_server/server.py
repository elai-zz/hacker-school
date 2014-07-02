# python server
# a class for request/parsing
# response object, dictionary

import socket
import random
import urllib2, urllib
from bs4 import BeautifulSoup
from PIL import Image
import io

SITE_URL = "http://localhost:8000"

def runServer():

    while True:
        s = socket.socket()
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind(('localhost', 8000))
        s.listen(5)
        (connection, addr) = s.accept()
        buf = ""
        while True:
            data = connection.recv(64)
            if (data == "") or (data.endswith("\r\n\r\n")):
                break
            else:
                buf += data
            parseRequest(buf, connection)
            connection.close()
            break
    
def parseRequest(buffer, connect):
    parsed = buffer.split(" ")
    if (parsed[0] == "GET"):
        connect.send('HTTP/1.1 200 OK\r\n')
        if parsed[1] == "/random":
            w = random.randint(300,400)
            h = random.randint(300,400)
            cat = urllib2.urlopen("http://placekitten.com/g/" + 
                str(w) + "/" + str(h))
            res = cat.read()
            connect.send("Content-Type: image/jpg\r\n\r\n")
            
        # we see a html
        elif (parsed[1].endswith(".html")):
            try:
                f = open(parsed[1][1:], 'r')
                res = f.read()
                f.close()
                kittens = replaceWithKittens(BeautifulSoup(res))

                for cat in kittens:
                    res = res.replace(cat, kittens[cat])
                connect.send('HTTP/1.1 200 OK\r\n')
                
            except IOError as e:
                res = ""
                connect.send('HTTP/1.1 404 File not found\r\n')
            connect.send("Content-Type: text/html\r\n\r\n")
            
        else:
            connect.send('HTTP/1.1 200 OK\r\n')
            connect.send("Content-Type: text/html\r\n\r\n")
            res = "<h1>poo</h1>"
            
    connect.send(res)
    

# but i need to do this in place...            
def replaceWithKittens(soup):
    kittens = {}
    for image in soup("img"):
        url = image['src']
        if "http" in url:
            # external
            fd = urllib.urlopen(url)
            image_file = io.BytesIO(fd.read())
            openedImg = Image.open(image_file)
            w,h = openedImg.size
            newKitten = "http://placekitten.com/g/" + str(w) + "/" + str(h)
            kittens[str(url)] = newKitten
    return kittens
    
runServer()