import __ from 'lodash';
import { useRef } from 'react';

function useDebounce(func: (e: unknown, event: string, r?: unknown, t?: unknown) => Promise<void>, wait?: number, options?: any) {
  return useRef(__.debounce(func, wait, options)).current;
}

export default useDebounce;
