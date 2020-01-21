<p align="center">
  <img alt="Fielder logo" src="https://github.com/andyrichardson/fielder/blob/master/docs/logo.png?raw=true" width="150px" />
</p>

<h1 align="center">Fielder</h1>
<p align="center">A React form library which adapts to change.</p>

<p align="center">
  <a href="https://circleci.com/gh/andyrichardson/fielder">
    <img src="https://img.shields.io/circleci/build/github/andyrichardson/fielder" alt="build" />
  </a>
  <a href="https://npmjs.com/package/fielder">
    <img src="https://img.shields.io/github/package-json/v/andyrichardson/fielder.svg" alt="version" />
  </a>
  <a href="https://bundlephobia.com/result?p=fielder">
    <img src="https://img.shields.io/bundlephobia/minzip/fielder.svg" alt="size" />
  </a>
  <a href="https://codecov.io/gh/andyrichardson/fielder">
    <img src="https://img.shields.io/codecov/c/github/andyrichardson/fielder.svg" alt="coverage">
  </a>
  <a href="https://github.com/andyrichardson/fielder/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/fielder.svg" alt="licence">
  </a>
  <a href="https://fielder.andyrichardson.dev">
    <img src="https://img.shields.io/badge/docs-visit%20site-orange" alt="docs">
  </a>
</p>

## About

_Fielder_ has been built from the ground up with a **field-first** approach to validation.

What does this mean?

- Validation can easily be added and removed to a form
- Only validate what the user can see (see cross form validation below)
- No need for a large set of upfront domain knowledge

## Features

### ⚡️Immediate validation

Synchronous validation will update state immediately in the event of a change/blur.

Fewer renders, better performance and no weird "intermediary states".

### 🔍 Optimized for flexibility

While Yup is supported, you're not limited to using a large Yup schema. Validation functions receive the form state as well as the field value.

```tsx
(value, state) =>
  state.otherField.value === 'string'
    ? Yup.string()
        .required()
        .validateSync(value)
    : Yup.number().validateSync(value);
```

### 🤓User focused API

Users don't want to find out that the value they entered on a previous page is invalid. This is why _Fielder_ encourages field-level validation.

If the field isn't mounted, the value won't be validated. Simple!

### 💁‍♂️ One way to do things

_Fielder_ has been built with hooks since day one. There aren't any clunky APIs to learn, only `useField`, `useForm` and `useFormContext`.

Your data doesn't need to be coupled to your components (and likely shouldn't be), that's why _Fielder_ doesn't include a component API.

## Usage

### Install Fielder

Install using your package manager of choice.

```sh
npm i fielder
```

### Setting up a form

`useForm` is where you initiate your form. In order to expose the form to any child components (and subsequently `useField`), you'll want to expose it via context.

```tsx
const myForm = useForm();

return <FielderProvider value={myForm}>{children}</FielderProvider>;
```

### Declaring fields

`useField` is where you harness the power of _Fielder_.

```tsx
const [nameProps, nameMeta] = useField({
  name: 'userName',
  validate: useCallback(
    v =>
      Yup.string()
        .required()
        .validateSync(v),
    []
  )
});

return (
  <>
    <input type="text" {...nameProps} />
    {nameMeta.touched && nameMeta.error && (
      <ErrorMsg>{nameMeta.error}</ErrorMsg>
    )}
  </>
);
```

There are a whole number of additional arguments which can be passed to `useField` which allow you to:

- Set validation
- Set when validation is triggered (e.g. on blur, change, etc)
- Set initial value, error, valid and touched states
- Set unmount behaviour

> Note: Unlike other popular form libraries, _Fielder_ allows you to change config options (such as validation) at any time.

## Resources

For more info and examples, check out the **[official docs site](https://fielder.andyrichardson.dev/)**.

For a deeper dive on Fielder and why it exists, check out [this blog post](https://dev.to/andyrichardsonn/why-we-need-another-form-library-fielder-4eah).
