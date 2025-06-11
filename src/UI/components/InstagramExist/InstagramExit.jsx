import React, { useEffect } from 'react';

function InstagramExit() {
  useEffect(() => {
    const handleExit = (event) => {
      event.preventDefault();
      event.returnValue = 'Are you sure you want to exit Instagram?';
    };

    window.addEventListener('beforeunload', handleExit);

    return () => {
      window.removeEventListener('beforeunload', handleExit);
    };
  }, []);

  return (
    <div>
      <p>You can now close this browser tab to exit Instagram.</p>
    </div>
  );
}

export default InstagramExit;
