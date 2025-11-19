self.addEventListener("push", function (event) {
    console.log('Pushing')
    // const data = event.data.json();
    const data = {};

    const title = data.title || "New Notification";
    const options = {
        // body: data.body,
        body: "Data from Backend",
        icon: "/logo192.png",
        badge: "/logo192.png",
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
