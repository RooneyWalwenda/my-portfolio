import { useState, useEffect } from 'react';
import ToastNotification from './ToastNotification';

const LinkInterceptorWithToast = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      // Skip processing if marked to skip or already processed
      if (anchor.hasAttribute('data-skip-external') || 
          anchor.classList.contains('external-link-processed')) {
        return;
      }

      // Skip internal links
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('/') || 
          href.startsWith(window.location.origin)) {
        return;
      }

      // Skip special protocol links
      if (href.startsWith('mailto:') || href.startsWith('tel:') || 
          href.startsWith('javascript:')) {
        return;
      }

      e.preventDefault();

      // Special handling for LinkedIn - use clean URL
      let finalUrl = href;
      if (href.includes('linkedin.com')) {
        // Strip to basic profile URL only
        finalUrl = href.split('?')[0].split('#')[0];
        setToastMessage('Opening LinkedIn profile...');
      } else {
        setToastMessage(`Opening ${anchor.textContent.trim()} in new tab...`);
      }

      // Add visual indicator
      if (!anchor.querySelector('.external-link-icon')) {
        const icon = document.createElement('span');
        icon.className = 'external-link-icon';
        icon.innerHTML = '↗';
        anchor.appendChild(icon);
      }

      // Mark as processed and open in new tab
      anchor.classList.add('external-link', 'external-link-processed');
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {children}
      <ToastNotification message={toastMessage} />
    </>
  );
};

export default LinkInterceptorWithToast;
