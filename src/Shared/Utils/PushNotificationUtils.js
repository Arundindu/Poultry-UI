import { ServiceUtils } from "./ServiceUtils";
import Toaster from "./Toaster";
import { CONSTANTS } from "../../Environments/config";

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export async function checkAndSubscribeUser() {
    const registration = await navigator.serviceWorker.ready;
    const existing = await registration.pushManager.getSubscription();
    if (existing) {
        console.log("Already subscribed");
        return;
    }
    subscribeUserForPush();
}

export async function subscribeUserForPush() {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.log("Notification permission denied");
            Toaster.error('NO PERMISSION', 'error')
            return;
        }
        Toaster.success('PERMISSION Step Done', 'success')
        const registration = await navigator.serviceWorker.ready;
        const applicationServerKey = urlBase64ToUint8Array(CONSTANTS.PUBLIC_KEY);
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        });

        console.log("Push Subscription:", subscription);
        Toaster.success("subscription", 'success')
        localStorage.setItem('subscription', JSON.stringify(subscription))
        // const payLoad = {
        //   subscription:subscription,
        //   notificationData:{
        //     message:"Message received",
        //     title:"Hey"
        //   }
        // }
        // ServiceUtils.postRequest("pushNotification", payLoad).then((response) => {
        //   if (response.status === "success") {
        //     Toaster.success("Notification permission enabled");
        //   } else {
        //     Toaster.error("Failed to save subscription");
        //   }
        // });
        return subscription;
    } catch (error) {
        console.error("Push Subscription Error", error);
        Toaster.error("Subscription failed");
        return null;
    }
}
