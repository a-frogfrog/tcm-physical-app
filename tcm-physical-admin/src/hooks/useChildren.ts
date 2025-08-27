import React from 'react';

export const useChildren = (
  children: React.ReactNode[],
  child: React.ElementType,
) => {
  let parts: React.ReactNode = null;
  children.forEach((c) => {
    if (!React.isValidElement(c)) return;
    const { type } = c;
    if (type === child) {
      parts = c;
    }
  });

  return parts;
};
