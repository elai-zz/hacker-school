import sqlite3
import sys

conn = sqlite3.connect('example.db')
c = conn.cursor()

def create(rest):
	name = rest[0].split(".")[0]
	query = "CREATE TABLE " + name + "(First text, Last text, Num text)"
	c.execute(query)
	conn.commit()
	print "created phonebook " + name + " in the current directory"
	return 1

def add(rest):
	name = rest[0].split(" ")
	if len(name) < 2:
		print "Must have First and Last name to delete!"
		return 0
	number = rest[1]
	phonebook = rest[2].split(".")[0]

	c.execute("select * from " + phonebook + " where First =? AND Last =?", (name[0], name[1]))

	if (c.fetchone() == None):
		c.execute("insert into " + phonebook + " values (?,?,?)", (name[0], name[1], number))
		conn.commit()
		return 1
	else:
		print "Duplicate Error"
		return 0

def lookup(rest, needPrint=True):
	name = rest[0].split(" ")
	phonebook = rest[1].split(".")[0]
	#print name
	#print phonebook
	if len(name) == 1:
		c.execute("select * from " + phonebook + " where First =?", (name[0],))
	else:
		c.execute("select * from " + phonebook + " where First =? AND Last =?", (name[0], name[1]))
	res = c.fetchall()
	if (res != None and res != []):
		if needPrint:
			formatOutput(res)
		return 1
	else: 
		print "No results found"
	return 0
	
def formatOutput(res):
	for line in res:
		result = ""
		for i in line:
			result += str(i) + " "
		print result + "\n"

def reverse(rest):
	num = rest[0]
	phonebook = rest[1].split(".")[0]
	c.execute("select * from " + phonebook + " where Num =?", (num,))
	res = c.fetchall()
	if res != None:
		formatOutput(res)
		return 1
	else: 
		print "No results found"
		return 0

def remove(rest):
	name = rest[0].split(" ")
	if len(name) < 2:
		print "Must have First and Last name to delete!"
		return 0
	phonebook = rest[1].split(".")[0]
	exists = lookup(rest, False)
	if exists:
		c.execute("delete from " + phonebook + " where First =? AND Last =? ", (name[0], name[1]))
		print "Record deleted"
		conn.commit()
		return 1
	else:
		# lookup prints for us already
		return 0

def change(rest):
	name = rest[0].split(" ")
	if len(name) < 2:
		print "Must have First and Last name to delete!"
		return 0
	newNum = rest[1]
	phonebook = rest[2].split(".")[0]
	exists = lookup([rest[0], rest[2]], False)
	if exists:
		c.execute("update " + phonebook + " set Num =? where First =? AND Last =?", (newNum, name[0], name[1]))
		print "Record updated"
		conn.commit()
	else:
		# lookup prints for us already
		return 0

if __name__ ==  "__main__":
	args = sys.argv

	options = {	'create':create,
				'add': add,
				'lookup': lookup,
				'reverse-lookup': reverse,
				'remove': remove,
				'change': change
	}	

	options[args[1]](args[2:])