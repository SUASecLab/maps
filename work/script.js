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
