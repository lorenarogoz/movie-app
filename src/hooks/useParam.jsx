import {useMemo, useCallback} from 'react';
import {useSearchParams} from 'react-router-dom';

export function useParam(key, defaultValue, normalize = (v) => v) {
    const [sp, setSp] = useSearchParams();

    const value = useMemo(() => {
        const raw = sp.get(key);
        return raw === null ? defaultValue : normalize(raw);
    }, [sp, key, defaultValue, normalize]);

    const setValue = useCallback(
        (next) => {
            setSp(
                (prev) => {
                    const nextSp = new URLSearchParams(prev);
                    const nv = normalize(next ?? '');
                    const isDefault = nv === '' || nv === defaultValue;
                    if (isDefault) nextSp.delete(key);
                    else nextSp.set(key, nv);
                    return nextSp;
                },
                {replace: true},
            );
        },
        [setSp, key, defaultValue, normalize],
    );

    return [value, setValue];
}
