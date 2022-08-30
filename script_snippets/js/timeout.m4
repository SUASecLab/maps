dnl Set timeout
dnl Creates a timeout
dnl
dnl Parameters:
dnl $1 function to call (function definition)
dnl $2 timeout
dnl
define(`TIMEOUT', `setTimeout($1, $2);')dnl
