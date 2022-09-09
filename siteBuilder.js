const settings = {buttonBackgroundColor: "rgb(200, 200, 200)", buttonWidth: "196px"}

class Page {
    constructor(icon, title, content) {
        this.icon = icon;
        this.title = title;
        this.content = content;

        this.generateButtonHTML();
    }

    generateButtonHTML() {
        this.button = document.createElement("div");
        this.button.classList.add("button")

        var icon = document.createElement("div");
        icon.classList.add("icon")
        icon.style.backgroundImage = "url(" + this.icon + ")";
        this.button.appendChild(icon);

        var text = document.createElement("div")
        text.classList.add("text")
        text.textContent = this.title;
        this.button.appendChild(text);

        this.button.onclick = () => {
            backButton.pageTracker.push(this)
            grid.clearElements()
            grid.populateByPage(this)
            window.scrollTo(0, 0);
        }
    }


}

class Grid {
    constructor() {
        this.element = document.createElement("div");
        this.element.classList.add("grid")

        document.body.appendChild(this.element)
    }

    displayContent(content) {
        var img = document.createElement("img")
        img.classList.add("img")
        img.src = content
        document.body.appendChild(img)
    }
    addCredits() {
        var credits = document.createElement("div");
        credits.classList.add("credits");
        credits.innerText = "פותח על ידי רועי אואנונו"
        document.body.append(credits);
    }
    decorate() {
        var background = document.createElement("div");
        background.classList.add("background");
        document.body.append(background);
        var logo = document.createElement("div");
        logo.classList.add("logo");
        document.body.append(logo);
        var banner = document.createElement("svg")
        banner.innerHTML = "<svg width=\"100%\" height=\"100%\" id=\"svg\" viewBox=\"0 0 1440 400\" xmlns=\"http://www.w3.org/2000/svg\" class=\"transition duration-300 ease-in-out delay-150\"><path d=\"M 0,400 C 0,400 0,200 0,200 C 122,180.10714285714286 244,160.21428571428572 377,174 C 510,187.78571428571428 654.0000000000001,235.25 767,252 C 879.9999999999999,268.75 962,254.78571428571428 1069,241 C 1176,227.21428571428572 1308,213.60714285714286 1440,200 C 1440,200 1440,400 1440,400 Z\" stroke=\"none\" stroke-width=\"0\" fill=\"#f3f7fa\" fill-opacity=\"1\" class=\"transition-all duration-300 ease-in-out delay-150 path-0\" transform=\"rotate(-180 720 200)\"></path></svg>"
        document.body.append(banner)
        banner.classList.add("banner")
        var title = document.createElement("div")
        banner.append(title)
        title.textContent = "דבר הרס\"ר"
        title.classList.add("title")
        var description = document.createElement("div")
        title.append(description)
        description.textContent = "בחרו בקטגוריה על מנת להציג את כל המידע הרלוונטי אליה"
        description.classList.add("description")
        
    }

    clearElements() {
        document.body.innerHTML = ""
        this.element.innerHTML = ""
    }

    populateByPage(page) {
        if (typeof(page.content) == "object") {
            this.decorate()
            document.body.appendChild(this.element)
            for (var subPage in page.content) {
                this.element.appendChild(page.content[subPage].button)
            }
            
        } else {
            this.displayContent(page.content)
        }
        if (backButton.pageTracker.length > 1) {
            document.body.appendChild(backButton.element);
        } else {
            this.addCredits()
        }
    }
}

class BackButton {

    constructor() {
        this.element = document.createElement("div")
        this.element.classList.add("backButton")
        this.pageTracker = [mainPage];
        this.element.onclick = () => {
            this.pageTracker.pop()
            grid.clearElements()
            grid.populateByPage(this.pageTracker[this.pageTracker.length-1])
            window.scrollTo(0, 0);
        }
    }



}

function recursiveContents(o) {

    var output = [];
    var result;
    if (typeof(o.content) == "object") {
        for (var c in o.content) {
            result = recursiveContents(o.content[c])
            output.push(new Page(result.icon, result.title, result.content))
        }
    } else {
        output = o.content
    }
    return new Page(o.icon, o.title, output)
}

screen.orientation.lock("portrait")
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("worker.js").then(registration => {
        console.log("worker registered!");

    }).catch(error => {
        console.log("worker error!");
        console.log(error)
    })
}

let pages = []
for (var c in structure) {
    pages.push(recursiveContents(structure[c]))
}

let mainPage = new Page("", "Main", pages)
let backButton = new BackButton();
let grid = new Grid()
grid.populateByPage(mainPage)

