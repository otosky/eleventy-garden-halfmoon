function getBackLinks(){
    return document.getElementsByClassName("backlink__preview")
}

function addOrRemoveDarkModeFromBacklink(method) {
    const backlinks = [...getBackLinks()]
    backlinks.map(backlink => backlink.classList[method]("dark-mode"))
}

// override halfmoon toggleDarkMode method to add/remove dark-mode from backlink previews
halfmoon.toggleDarkMode = function() {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        addOrRemoveDarkModeFromBacklink("remove")
        this.darkModeOn = false;
        this.createCookie("halfmoon_preferredMode", "light-mode", 365);
    } else {
        document.body.classList.add("dark-mode");
        addOrRemoveDarkModeFromBacklink("add")
        this.darkModeOn = true;
        this.createCookie("halfmoon_preferredMode", "dark-mode", 365);
    }
};

function matchBacklinksToPreferredMode() {
    if (halfmoon.darkModeOn) {
        addOrRemoveDarkModeFromBacklink("add")
    }
}

// Set .active class on current Link in Sidebar
document.addEventListener("DOMContentLoaded", function() {
    // Getting the required elements
    var docsSectionId = document.getElementById("docs-section-id").value;
    var activeDocsSectionSidebarMenuItem = document.getElementById("sidebar-" + docsSectionId);
    // Adding the active class to the sidebar menu item
    activeDocsSectionSidebarMenuItem.classList.add("active");

    matchBacklinksToPreferredMode()
});