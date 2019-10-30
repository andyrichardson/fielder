import { useContext, useEffect, useCallback, useMemo } from "react";
import { FormContext } from "./context";
export const useField = ({ name: initialName, validate, initialValid, initialError, initialValue, initialTouched }) => {
    const ctx = useContext(FormContext);
    const name = useMemo(() => initialName, []);
    const { touched, value, error, isValid } = useMemo(() => ctx.fields[name] || {
        value: initialValue,
        isValid: initialValid || false,
        touched: initialTouched || false,
        error: initialError
    }, [name, ctx]);
    useEffect(() => {
        ctx.setFields(f => ({
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
        return () => ctx.setFields(f => ({
            ...f,
            [name]: undefined
        }));
    }, []);
    useEffect(() => {
        ctx.setFields(f => ({
            ...f,
            [name]: {
                ...f[name],
                validate
            }
        }));
    }, [validate, ctx.setFields]);
    const onBlur = useCallback(() => {
        ctx.setFields(f => ({
            ...f,
            [name]: {
                ...f[name],
                touched: true
            }
        }));
    }, [ctx.setFields]);
    const onChange = useCallback((e) => {
        ctx.setFields(f => ({
            ...f,
            [name]: {
                ...f[name],
                value: e.currentTarget.value
            }
        }));
    }, [ctx.setFields]);
    console.log("rerender");
    return useMemo(() => [{ name, value, onBlur, onChange }, { touched, error, isValid }], [value, onBlur, onChange, name, touched, error, isValid, ctx]);
};
