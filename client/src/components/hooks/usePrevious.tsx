import {useEffect, useRef} from "react";

/**
 * Custom hook to compare older values to new values
 * @param value
 */
const usePrevious = <T extends any>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default usePrevious;