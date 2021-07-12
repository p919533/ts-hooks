import { useEffect, useState } from "react";

const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const clearObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <D>(value: D, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    // 每次在上一个useEffect处理完以后在运行
    return () => {
      return clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(persons: T[]) => {
  const [value, setValue] = useState(persons);

  function clear() {
    setValue([]);
  }

  function removeIndex(index: number) {
    const list = [...value];
    list.splice(index, 1);
    setValue(list);
  }

  function add(obj: T) {
    setValue([...value, obj]);
  }

  return { value, clear, removeIndex, add };
};
