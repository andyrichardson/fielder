import { useLayoutEffect as useLayoutEffectOriginal, useEffect } from 'react';

export const useLayoutEffect = typeof window !== 'undefined' ? useLayoutEffectOriginal : useEffect;