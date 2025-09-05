import { useState } from 'react';

export const useHeaderShadow = () => {
  const [headerShadow, setHeaderShadow] = useState(false);
  return { headerShadow, setHeaderShadow };
};
