// self.addEventListener("push", function (event) {
//     console.log('Pushing',event)
    
//     const data = event || {};
//     // const data = {};

//     const title = "New Notification";
//     const options = {
//         body: 'Data From Backend',
//         icon: "/logo192.png",
//         badge: "/logo192.png",
//     };

//     event.waitUntil(self.registration.showNotification(title, options));
// });
self.addEventListener("push", function (event) {
    console.log("Push event received:", event);

    let data = {};
    if (event.data) {
        data = event.data.json(); 
    }

    const title = data?.title || "New Notification";
    const options = {
        body: data?.body || "No message",
        icon: "/logo192.png",
        badge: "/logo192.png",
        data: data
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
