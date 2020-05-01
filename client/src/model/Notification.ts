import NotificationType from "./NotificationType";

class Notification {
    message: string;
    type: NotificationType;

    constructor(message: string, type: NotificationType) {
        this.message = message;
        this.type = type;
    }
}

export default Notification;