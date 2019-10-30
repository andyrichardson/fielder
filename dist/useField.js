import { useContext, useEffect, useCallback, useMemo } from "react";
import { FormContext } from "./context";
export const useField = ({ name: initialName, validate, initialValid, initialError, initialValue, initialTouched }) => {
    const { fields, setFields } = useContext(FormContext);
    const name = useMemo(() => initialName, []);
    const { touched, value, error, isValid } = useMemo(() => fields[name], [name, fields]);
    useEffect(() => {
        setFields(f => ({
            ...f,
            [name]: {
                name,
                value: initialValue,
                isValid: initialValid || false,
                touched: initialTouched || false,
                error: initialError,
                validate
            }
        }));
        return () => setFields(f => ({
            ...f,
            [name]: undefined
        }));
    }, []);
    useEffect(() => {
        setFields(f => ({
            ...f,
            [name]: {
                ...f[name],
                validate
            }
        }));
    }, [validate]);
    const onBlur = useCallback(() => {
        setFields(f => ({
            ...f,
            [name]: {
                ...f[name],
                touched: true
            }
        }));
    }, [setFields]);
    const onChange = useCallback((e) => {
        setFields(f => ({
            ...f,
            [name]: {
                ...f[name],
                value: e.currentTarget.value
            }
        }));
    }, [setFields]);
    return useMemo(() => [{ name, value, onBlur, onChange }, { touched, error, isValid }], [value, onBlur, onChange, name, touched, error, isValid]);
};
