dnl WorkAdventure nav operations
dnl
dnl Opening a CoWebsite
dnl
dnl Parameters:
dnl $1 URL (mandatory)
dnl $2 allowApi (optional)
dnl $3 allowPolicy (optional)
dnl $4 percentWidth (optional)
dnl $5 position (optional)
dnl $6 closable (optional)
dnl $7 lazy (optional)
dnl
define(`OPEN_COWEBSITE', `dnl
ifelse(eval(len($7) > 0), 1, `await WA.nav.openCoWebSite($1, $2, $3, $4, $5, $6, $7);',
        eval(len($6) > 0), 1, `await WA.nav.openCoWebSite($1, $2, $3, $4, $5, $6);',
        eval(len($5) > 0), 1, `await WA.nav.openCoWebSite($1, $2, $3, $4, $5);',
        eval(len($4) > 0), 1, `await WA.nav.openCoWebSite($1, $2, $3, $4);',
        eval(len($3) > 0), 1, `await WA.nav.openCoWebSite($1, $2, $3);',
        eval(len($2) > 0), 1, `await WA.nav.openCoWebSite($1, $2);',
        eval(len($1) > 0), 1, `await WA.nav.openCoWebSite($1);',
        `errprint(__program__:__file__:__line__: Error: Call to openCoWebSite without handing over URL)
m4exit(`1')') dnl
')dnl
dnl
dnl Opening a website in a new tab
dnl
dnl Parameters:
dnl $1 URL (mandatory)
dnl
define(`OPEN_TAB', `dnl
ifelse(eval(len($1) > 0), 1, `
    WA.nav.openTab("$1");',dnl
    `errprint(__program__:__file__:__line__: Error: Call to openTab without handing over URL)
m4exit(`1')')dnl
')dnl
dnl
dnl
dnl Change map with respect to exam mode:
dnl Map is only changed if the user does not have the exam tag
dnl
dnl Parameters:
dnl $1 Map name
dnl
define(`CHANGE_MAP', `dnl
if (!(WA.player.tags.includes("exam"))) {
    WA.nav.goToRoom($1);
}
')dnl
