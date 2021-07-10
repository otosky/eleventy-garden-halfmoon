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
}