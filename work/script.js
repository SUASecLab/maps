var rc3MapEnabled = false;

function enableRc3Map() {
    rc3MapEnabled = true;
}

WA.onInit().then(() => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    if ((month === 11) &&
        (27 <= day) &&
        (day <= 30)) {
        enableRc3Map();
    }
});

WA.room.onEnterZone('rc3Portal', () => {
    if (rc3MapEnabled) {
        WA.nav.goToRoom("/@/org/lab.itsec.hs-sm.de/rc3");
    }
});

function contiki(nr) {
    let components = 'Could not fetch components';
    let XHR = null;
    
    function displayComponents(nr, components) {
        WA.ui.openPopup(
            'contiki-' + nr,
            'Workplace ' + nr + '\n' + components,
            [{
                label: "Close",
                className: "primary",
                callback: (popup) => {
                    popup.close();
                }
            }]
        );
    }
    
    try {
        XHR = new XMLHttpRequest();
    } catch(e) {
         console.error('Could not generate XHR');
    }
    
    if (XHR) {
        XHR.open('GET', '/components/nr/' + nr, true);
        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4 && this.status == 200) {
                components =  XHR.responseText;
                displayComponents(nr, components);
            } else {
                console.error("XHR component request not successful");
            }
        }
        XHR.send(null);
    } else {
        console.error("No XHR present, therefore no components request");
    }    
}

WA.room.onEnterZone('contiki-1', () => {
    contiki(1);
});

WA.room.onEnterZone('contiki-2', () => {
    contiki(2);
});

WA.room.onEnterZone('contiki-3', () => {
    contiki(3);
});

WA.room.onEnterZone('contiki-4', () => {
    contiki(4);
});

WA.room.onEnterZone('contiki-5', () => {
    contiki(5);
});

WA.room.onEnterZone('contiki-6', () => {
    contiki(6);
});
