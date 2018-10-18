var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AsyncStorage } from "react-native";
import { Platform } from "react-native";
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, } from "react-native-fcm";
FCM.on(FCMEvent.Notification, (notif) => __awaiter(this, void 0, void 0, function* () {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if (notif.localNotification) {
        console.log("LOCAL:", notif);
    }
    else {
        showNotificationFromObject(notif);
    }
    if (notif.openedFromTray) {
        // iOS: app is open/resumed because user clicked banner
        // Android: app is open/resumed because user clicked banner or tapped app icon
    }
    // await someAsyncCall();
    if (Platform.OS === "ios") {
        // optiona
        // iOS requires developers to call completionHandler to end notification process.
        // If you do not call it your background remote notifications could be throttled,
        // to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
        // This library handles it for you automatically with default behavior
        // (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground").
        // However if you want to return different result, follow the following code to override
        // notif._notificationType is available for iOS platfrom
        switch (notif._notificationType) {
            case NotificationType.Remote:
                // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                notif.finish(RemoteNotificationResult.NewData);
                break;
            case NotificationType.NotificationResponse:
                notif.finish();
                break;
            case NotificationType.WillPresent:
                // other types available: WillPresentNotificationResult.None
                notif.finish(WillPresentNotificationResult.All);
                break;
            default: break;
        }
    }
}));
FCM.on(FCMEvent.RefreshToken, token => {
    console.log("Refresh token: ", token);
    // fcm token may not be available on first load, catch it here
});
export const showNotificationFromObject = o => {
    const { title = null, message = null, big_text = null, action = null, badge = null, no = null, auto_cancel = null, sub_text = null, ongoing = null, sound = null, priority = null, large_icon = null, icon = null, color = null, picture = null, vibrate = null, wake_screen = null, group = null, lights = null, show_in_foreground = null, } = o;
    if (title && message)
        showNotification(title, message, big_text, action, badge, no, auto_cancel, sub_text, ongoing, sound, priority, large_icon, icon, color, picture, vibrate, wake_screen, group, lights, show_in_foreground);
};
export const showNotification = (title, message, bigText = null, action = null, badge = null, no = null, autoCancel = false, subText = null, ongoing = false, sound = "default", priority = "high", largeIcon = "ic_launcher", icon = "ic_launcher", color = "red", picture = null, vibrate = 300, wakeScreen = true, group = "group", lights = true, showInForeground = true) => {
    FCM.presentLocalNotification({
        title: title,
        body: message,
        sound: sound,
        priority: priority,
        click_action: action,
        badge: badge,
        number: no,
        auto_cancel: autoCancel,
        large_icon: largeIcon,
        icon: icon,
        big_text: bigText,
        sub_text: subText,
        color: color,
        vibrate: vibrate,
        wake_screen: wakeScreen,
        group: group,
        picture: picture,
        ongoing: ongoing,
        lights: lights,
        show_in_foreground: showInForeground,
    });
};
export const welcomeUser = (title, message, bigText, subText) => {
    AsyncStorage.getItem("WELCOME_USER")
        .then(res => {
        if (!res) {
            showNotification(title, message, bigText, subText);
            AsyncStorage.setItem("WELCOME_USER", "true");
        }
    })
        .catch(err => console.log(err));
};
