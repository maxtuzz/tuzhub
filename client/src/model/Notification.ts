import NotificationType from "./NotificationType";

class Notification {
    message: string;
    type: NotificationType;

    constructor(type: NotificationType, message: string) {
        this.message = message;
        this.type = type;
    }
}

export default Notification;