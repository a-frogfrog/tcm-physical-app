import { useLayoutStore } from '#/stores';
import { debounce } from '#/utils';
import clsx from 'clsx';
import React from 'react';

const APP_HEADER_HEIGHT = 64;
const APP_FOOTER_HEIGHT = 40;
const APP_MAIN_CONTENT_HEIGHT = `calc(100vh - ${APP_HEADER_HEIGHT}px - ${APP_FOOTER_HEIGHT}px)`;

const LayoutContext = React.createContext({
  appHeaderHeight: APP_HEADER_HEIGHT,
  appFooterHeight: APP_FOOTER_HEIGHT,
  appMainContentHeight: APP_MAIN_CONTENT_HEIGHT,
  headerFixed: true,
  headerShadow: false,
});

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {
    appHeaderHeight: APP_HEADER_HEIGHT,
    appFooterHeight: APP_FOOTER_HEIGHT,
    appMainContentHeight: APP_MAIN_CONTENT_HEIGHT,
    headerFixed: true,
    headerShadow: false,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

const Layout = ({ className, children }: React.ComponentProps<'div'>) => {
  const { appHeaderHeight } = React.useContext(LayoutContext);
  const { headerShadow, setHeaderShadow } = useLayoutStore();

  const handleScroll = (scrollTop: number) => {
    if (scrollTop > appHeaderHeight && !headerShadow) {
      // add shadow
      setHeaderShadow(true);
    } else if (scrollTop <= 10) {
      // remove shadow
      setHeaderShadow(false);
    }
  };

  const debouncedHandleScroll = debounce(
    (scrollTop: number) => handleScroll(scrollTop),
    50,
  );
  return (
    <div
      role='layout'
      aria-label='Layout'
      className={`w-full max-h-screen overflow-auto relative ${className}`}
      onScroll={(e) => debouncedHandleScroll(e.currentTarget.scrollTop)}>
      {children}
    </div>
  );
};

const LayoutHeader = ({ children }: { children: React.ReactNode }) => {
  const { headerShadow } = useLayoutStore();

  return (
    <header
      aria-label='Header'
      role='header'
      className={clsx('top-0 sticky backdrop-blur-xl duration-150', {
        'shadow-md': headerShadow,
      })}>
      {children}
    </header>
  );
};

const LayoutFooter = ({
  children,
  ...props
}: React.ComponentProps<'footer'>) => {
  const { appFooterHeight } = React.useContext(LayoutContext);
  return (
    <footer
      className='px-4 text-gray-500'
      style={{ height: appFooterHeight }}
      {...props}>
      {children}
    </footer>
  );
};

const LayoutMain = ({ children, ...props }: React.ComponentProps<'main'>) => {
  return <main {...props}>{children}</main>;
};

export { LayoutProvider, LayoutHeader, LayoutFooter, LayoutMain, Layout };
