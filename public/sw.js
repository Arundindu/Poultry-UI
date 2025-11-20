self.addEventListener("push", function (event) {
    let data = {};
    if (event.data) {
        data = event.data.json(); 
    }
    const title = data?.title || "New Notification";
    const options = {
        body: data?.body || "No message",
        icon: "/logo192.png",
        badge: "/logo192.png",
        data: data,
        actions: [
            { action: "markAsRead", title: "Mark as read" }
        ]
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
// When user clicks notification
self.addEventListener("notificationclick", function (event) {
    const payload = event.notification.data;
    console.log("Notification clicked:", payload);

    event.notification.close();

    if (payload?.url) {
        event.waitUntil(clients.openWindow(payload.url));
    }
});
// self.addEventListener("notificationclick", (event) => {
//     event.notification.close();

//     const payload = event.notification.data;
//     const urlToOpen = payload?.url || "/";

//     event.waitUntil(
//         clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
//             // If a tab is already open → focus it
//             for (const client of clientList) {
//                 if (client.url === urlToOpen && "focus" in client) {
//                     return client.focus();
//                 }
//             }
//             // Otherwise → open a new tab
//             if (clients.openWindow) {
//                 return clients.openWindow(urlToOpen);
//             }
//         })
//     );
// });
