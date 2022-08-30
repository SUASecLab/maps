dnl XHR routine
dnl Creates an XHR and runs it
dnl
dnl Parameters:
dnl $1 HTTP Method (GET, POST, etc.)
dnl $2 URL
dnl $3 onreadystatechange-function
dnl 
define(`XHR', `var `XHR';
            try {
                `XHR' = new XMLHttpRequest();
            } catch (e) {
                console.error("Could not generate `XHR'");
            }
            
            if (`XHR') {
                `XHR'.open("$1", $2, true);
                `XHR'.onreadystatechange = $3
                `XHR'.send(null);
            }')dnl
