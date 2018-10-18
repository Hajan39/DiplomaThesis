import { AsyncStorage } from "react-native";
import { Platform } from "react-native";
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType,
} from "react-native-fcm";

FCM.on(FCMEvent.Notification, async notif => {
  // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
  if (notif.localNotification) {
    console.log("LOCAL:", notif);
  } else {
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
});

FCM.on(FCMEvent.RefreshToken, token => {
  console.log("Refresh token: ", token);
  // fcm token may not be available on first load, catch it here
});

export const showNotificationFromObject = o => {
  const {
    title = null,
    message = null,
    big_text = null,
    action = null,
    badge = null,
    no = null,
    auto_cancel = null,
    sub_text = null,
    ongoing = null,
    sound = null,
    priority = null,
    large_icon = null,
    icon = null,
    color = null,
    picture = null,
    vibrate = null,
    wake_screen = null,
    group = null,
    lights = null,
    show_in_foreground = null,
  } = o;
  if (title && message) showNotification(title,
    message,
    big_text,
    action,
    badge,
    no,
    auto_cancel,
    sub_text,
    ongoing,
    sound,
    priority,
    large_icon,
    icon,
    color,
    picture,
    vibrate,
    wake_screen,
    group,
    lights,
    show_in_foreground);
};

export const showNotification = (
  title: string,
  message: string,
  bigText: string = null,
  action: string = null,
  badge: number = null,
  no: number = null,
  autoCancel: boolean = false,
  subText: string = null,
  ongoing: boolean = false,
  sound: string = "default",
  priority: string = "high",
  largeIcon: string = "ic_launcher",
  icon: string = "ic_launcher",
  color: string = "red",
  picture: string = null,
  vibrate: number = 300,
  wakeScreen: boolean = true,
  group: string = "group",
  lights: boolean = true,
  showInForeground: boolean = true,
) => {
  FCM.presentLocalNotification({
    title: title, // as FCM payload
    body: message, // as FCM payload (required)
    sound: sound, // as FCM payload
    priority: priority, // as FCM payload
    click_action: action, // as FCM payload
    badge: badge, // as FCM payload IOS only, set 0 to clear badges
    number: no, // Android only
    auto_cancel: autoCancel, // Android only (default true)
    large_icon: largeIcon, // Android only
    icon: icon, // as FCM payload, you can relace this with custom icon you put in mipmap
    big_text: bigText, // Android only
    sub_text: subText, // Android only
    color: color, // Android only
    vibrate: vibrate, // Android only default: 300, no vibration if you pass 0
    wake_screen: wakeScreen, // Android only, wake up screen when notification arrives
    group: group, // Android only
    picture: picture, // Android only bigPicture style
    ongoing: ongoing, // Android only
    lights: lights, // Android only, LED blinking (default false)
    show_in_foreground: showInForeground, // notification when app is in foreground (local & remote)
  });
};

export const welcomeUser = (title: string, message: string, bigText: string, subText: string) => {
  AsyncStorage.getItem("WELCOME_USER")
    .then(res => {
      if (!res) {
        showNotification(title, message, bigText, subText);
        AsyncStorage.setItem("WELCOME_USER", "true");
      }
    })
    .catch(err => console.log(err));
};
