var rc3MapEnabled = false;
var popups = [];
var popupNumber = 0;
let adminHintShown = false;

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
    
    /* Show hint for changing components to admins */
    if ((WA.player.tags.includes("admin")) && (!adminHintShown)) {
        adminHintShown = true;
        WA.chat.sendChatMessage("You can change the displayed components here:", "Components")
        WA.chat.sendChatMessage("https://lab.itsec.hs-sm.de/components/edit/?uuid=" + WA.player.id, "Components")
        WA.chat.sendChatMessage("Do not forget to select the correct table number", "Components")
    }

    function displayComponents(nr, components) {
        popups[popupNumber] = WA.ui.openPopup(
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
        popupNumber++;
    }
    
    try {
        XHR = new XMLHttpRequest();
    } catch(e) {
         console.error('Could not generate XHR');
    }
    
    if (XHR) {
        XHR.open('GET', '/components/nr/' + nr + "?uuid=" + WA.player.id, true);
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

function cleanup() {
  for (let i = 0; i < popupNumber; i++) {
      if (popups[i]) {
          popups[i].close();
          popups[i] = null;
      }
  }
}

WA.room.onLeaveZone('contiki-1', () => {
    cleanup();
});

WA.room.onLeaveZone('contiki-2', () => {
    cleanup();
});

WA.room.onLeaveZone('contiki-3', () => {
    cleanup();
});

WA.room.onLeaveZone('contiki-4', () => {
    cleanup();
});

WA.room.onLeaveZone('contiki-5', () => {
    cleanup();
});

WA.room.onLeaveZone('contiki-6', () => {
    cleanup();
});
