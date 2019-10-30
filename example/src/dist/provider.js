import React, { useState, useRef, useCallback, useMemo } from "react";
import { FormContext } from "./context";
export const FormProvider = ({ children }) => {
    const [uselessState, setUselessState] = useState(false);
    const fields = useRef({});
    /** Forces re-render after mutation. */
    const update = useCallback(() => setUselessState(s => !s), []);
    const setFields = useCallback((arg, noUpdate = false) => {
        const newFields = typeof arg === "function" ? arg(fields.current) : arg;
        Object.entries(newFields).forEach(([key, value]) => {
            if (!value) {
                delete fields.current[key];
                return;
            }
            fields.current[key] = value;
        });
        !noUpdate && update();
    }, [fields, update]);
    const validateFields = useCallback(() => setFields(f => Object.entries(f).reduce((p, [key, value]) => ({
        ...p,
        [key]: validateFieldState(value)
    }), {}), true), [setFields]);
    const validateField = useCallback(name => {
        setFields(f => ({
            ...f,
            [name]: validateFieldState(f[name])
        }));
    }, [setFields]);
    useMemo(validateFields, [uselessState]);
    const isValid = useMemo(() => Object.values(fields.current).every(f => f.isValid), [uselessState]);
    const value = useMemo(() => ({
        fields: fields.current,
        setFields,
        validateField: (name) => {
            validateField(name);
            update();
        },
        validateFields: () => {
            validateFields();
            update();
        },
        isValid
    }), [uselessState, setFields, validateField, validateFields, isValid]);
    return React.createElement(FormContext.Provider, { value: value }, children);
};
const validateFieldState = (f) => {
    if (!f.touched || !f.validate) {
        return f;
    }
    const validationResult = f.validate(f.value);
    if (!validationResult && f.isValid) {
        return f;
    }
    return {
        ...f,
        isValid: !validationResult,
        error: validationResult
    };
};
