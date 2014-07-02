import sqlite3
import sys

conn = sqlite3.connect('example.db')
c = conn.cursor()

def create(rest):
	name = rest[0].split(".")[0]
	query = "CREATE TABLE " + name + "(First text, Last text, Num text)"
	c.execute(query)
	print "created phonebook " + name + " in the current directory"
	return

def add(rest):
	name = rest[0].split(" ")
	number = rest[1]
	phonebook = rest[2].split(".")[0]
	inDB = False

	#check exist here
	print c.execute()

	if not(inDB):
		c.execute("insert into " + phonebook + " values (?,?,?)", (name[0], name[1], number))
		return
	else:
		return "Duplicate Error"

def lookup(rest):

	#foo

def change(rest):
	#foo

def remove(rest):
	#foo

def reverse(rest):
	
if __name__ ==  "__main__":
	args = sys.argv

	options = {	'create':create,
				'add': add,
				# 'lookup': lookup,
				# 'change': change,
				# 'remove': remove,
				# 'reverse-lookup': reverse
	}	

	options[args[1]](args[2:])