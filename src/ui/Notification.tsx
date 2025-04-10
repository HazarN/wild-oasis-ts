import { Toaster } from 'react-hot-toast';

import { SECOND } from '@models/constants';

function Notification() {
  return (
    <Toaster
      position='top-center'
      gutter={12}
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: {
          duration: 3 * SECOND,
        },
        error: {
          duration: 5 * SECOND,
        },
        style: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '16px 24px',
          backgroundColor: 'var(--color-grey-0)',
          color: 'var(--color-grey-700)',
        },
      }}
    />
  );
}

export default Notification;
