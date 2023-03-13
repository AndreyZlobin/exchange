import { NotificationContainer as UiNotificationContainer, NOTIFY_POSITIONS } from '@astral/ui';

const NOTIFICATION_TIMEOUT = 2750;

export const NotificationContainer = ({
  position = NOTIFY_POSITIONS.BOTTOM_RIGHT,
  autoClose = NOTIFICATION_TIMEOUT,
}) => {
  return <UiNotificationContainer position={position} autoClose={autoClose} />;
};
