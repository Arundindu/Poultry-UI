self.addEventListener("push", function (event) {
    console.log('Pushing',event)
    const data = event;
    // const data = {};

    const title = data.title || "New Notification";
    const options = {
        body: data.body,
        icon: "/logo192.png",
        badge: "/logo192.png",
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
