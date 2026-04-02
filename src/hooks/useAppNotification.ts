import { notification, App } from 'antd';

// Configure notification defaults
notification.config({
  placement: 'topRight',
  duration: 4,
  maxCount: 3,
});

const notificationStyle = {
  style: {
    height: 50,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    margin: 0,
    justifyContent: 'space-between',
    paddingRight: 15,
    width: 'max-content',
  },
  duration: 4
};

export const useAppNotification = () => {

  const { notification: appNotification } = App.useApp();

  return {
    successToast: (message: string, description?: string) => {
      // console.log('Notification success called:', message, description);
      try {
        appNotification.success({
          message,
          description,
          ...notificationStyle,
        });
      } catch (error) {
        // console.error('Error showing success notification:', error);
      }
    },
    errorToast: (message: string, description?: string) => {
      // console.log('Notification error called:', message, description);
      try {
        appNotification.error({
          message,
          description,
          ...notificationStyle,
        });
      } catch (error) {
        // console.error('Error showing error notification:', error);
      }
    },
    warning: (message: string, description?: string) => {
      // console.log('Notification warning called:', message, description);
      try {
        appNotification.warning({
          message,
          description,
          ...notificationStyle,
        });
      } catch (error) {
        // console.error('Error showing warning notification:', error);
      }
    },
    info: (message: string, description?: string) => {
      // console.log('Notification info called:', message, description);
      try {
        appNotification.info({
          message,
          description,
          ...notificationStyle,
        });
      } catch (error) {
        // console.error('Error showing info notification:', error);
      }
    },
  };
}; 