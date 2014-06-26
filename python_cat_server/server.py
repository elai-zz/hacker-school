# python server
# a class for request/parsing
# response object, dictionary

import socket
import random
import urllib2

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
    print parsed[1]
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
        elif ("html" in parsed[1]):
            try:
                print parsed[1][1:]
                f = open(parsed[1][1:], 'r')
                print f.read()
                res = f.read()
                connect.send('HTTP/1.1 200 OK\r\n')
                connect.send("Content-Type: text/html\r\n\r\n")
                
            except IOError as e:
                connect.send('HTTP/1.1 500 Error\r\n')
            
        else:
            connect.send('HTTP/1.1 200 OK\r\n')
            connect.send("Content-Type: text/html\r\n\r\n")
            res = "<h1>poo</h1>"
    connect.send(res)
            
            
runServer()