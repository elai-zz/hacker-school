A simple phonebook exercise using python and sqlite

Usage (in terminal): 

1. Create a new phonebook 
	- Error message on failure

	`$ python phonebook.py create hsphonebook.pb`


2. Look up by first name or first and last name
	- Error message on result not found

	`$ python phonebook.py lookup Bob hsphonebook.pb`
	`$ python phonebook.py lookup Bob Dylan hsphonebook.pb`

	Example Results: 

		Sarah Ahmed 432 123 4321

		Sarah Apple 509 123 4567

		Sarah Orange 123 456 7890


3. Add a new record 
	- Error message on insufficient arguments to name (must have both first and last names)
	- Error message on duplicate

	`$ python phonebook.py add 'John Michael' '123 456 4323' hsphonebook.pb`


4. Update an existing record
	- Error message on insufficient arguments to name (must have both first and last names)
	- Error message on result not found 

	`$ python phonebook.py change 'John Michael' '234 521 2332' hsphonebook.pb`


5. Remove an existing record 
	- Error message on insufficient arguments to name (must have both first and last names)
	- Error message on result not found 
	`$ python phonebook.pb remove 'John Michael' hsphonebook.pb # error message on not exist`


6. Perform reverse lookup on a record
	- Error message on result not found 
	`$ python phonebook.pb reverse-lookup '312 432 5432' hsphonebook.pb`
