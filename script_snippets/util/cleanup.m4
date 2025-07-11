dnl Cleanup routine
dnl Closes the coWebsite and removes the trigger message
dnl Additional methods can be handed over as parameter
dnl
define(`CLEANUP', `function cleanup() {
    if (triggerMessage) {
        triggerMessage.remove();
    }
    if (coWebsite) {
        coWebsite.close();
    }
    if (coWebsite2) {
        coWebsite2.close();
    }
    if (coWebsiteJitsi) {
        coWebsiteJitsi.close();
    }
    $1
}')dnl
