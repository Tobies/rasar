self.addEventListener("install", e => {
    console.log("Installed")
})

self.addEventListener("fetch", e => {
    console.log("fetched " + e)
})