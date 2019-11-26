## Field lifecycle

### 1. Mount

The field is mounted for the first time and is initialized in the form state.

> Note: This can cause a number of changes to the form-wide state such as the _valid_ and _validating_ states.

### 2. Change

The field has changed in some way and the form state is updated.

Change events include:

- value is changed (onChange)
- field is blurred (onBlur)
- field validation has changed (new _validate_ option passed to _useField_)

### 3. Unmount

The field is no longer mounted and is set as inactive in the form-wide state.

Optionally, the field can be be purged from the form state.

> Note: Inactive fields are not validated, however, other fields can still see their values and validate accordingly.

### 4. Remount (Optional)

Fields which have not been purged can be re-mounted. In this case, their value prior to unmounting will be used.

> Note: Remounting is often useful when working with multi-page forms.
