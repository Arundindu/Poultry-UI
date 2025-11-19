import Toaster from "../src/Shared/Utils/Toaster";

self.addEventListener("push", function (event) {
    console.log('Pushing',event)
    Toaster.success(event,'success')
    Toaster.success(event.title,'success')
    Toaster.success(event.body,'success')
    
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
