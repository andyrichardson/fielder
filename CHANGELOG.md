# Changelog

## [2.1.1](https://github.com/andyrichardson/fielder/tree/2.1.1) (2021-11-02)

[Full Changelog](https://github.com/andyrichardson/fielder/compare/v2.1.0...2.1.1)

**Closed issues:**

- useLayoutEffect warning when server side rendering [\#317](https://github.com/andyrichardson/fielder/issues/317)

**Merged pull requests:**

- Fix next.js support [\#318](https://github.com/andyrichardson/fielder/pull/318) ([andyrichardson](https://github.com/andyrichardson))
- Update dev deps [\#302](https://github.com/andyrichardson/fielder/pull/302) ([andyrichardson](https://github.com/andyrichardson))

## [2.1.0](https://github.com/andyrichardson/fielder/tree/2.1.0) (2021-01-13)

[Full Changelog](https://github.com/andyrichardson/fielder/compare/v2.0.0...2.1.0)

**Additions:**

- Add preact support [\#299](https://github.com/andyrichardson/fielder/issues/299)

**Merged pull requests:**

- Add preact support [\#300](https://github.com/andyrichardson/fielder/pull/300) ([andyrichardson](https://github.com/andyrichardson))

## [v2.0.0](https://github.com/andyrichardson/fielder/tree/v2.0.0)

### A new major release!

That's right, a new major release jam packed full of new features and with a side helping of breaking changes.

### New docs site

Technically not part of this release but definitely worth a visit to check out the new guides!

[Visit the docs!](https://fielder.andyrichardson.dev)

### Event driven validation

Validation is now tailored to specific events (`mount`, `blur`, `submit`, etc).

This provides extra flexibility to tweak validation for specific scenarios - such as triggering async validation only on submit (see example below).

```tsx
useField({
  validate: useCallback(({ trigger, value  }) {
    // Validation for all events
    if (!value) {
      throw Error("Value is required.");
    }

    // Validation for blur only events
    if (trigger == "blur" && value.length < 4) {
      throw Error("Value must be at least 4 characters.");
    }

    // Async validation only on submit
    if (trigger == "submit") {
      return serverSideValidation(value).then((isValid) => {
        if (!isValid) {
          throw Error("Server side validation failed");
        }
      });
    }
  }, [])
})
```

More info on event driven validation can be [found here](https://fielder.andyrichardson.dev/guides/validation#validation-events).

### useSubmit hook

There's a new `useSubmit` hook which:

- triggers the new `submit` validation event
- aggregates field values into a single object
- tracks state of async submission validation
- guards submission logic until validation succeeds

```tsx
const { isValidating, hasSubmitted, handleSubmit } = useSubmit(() => {
  console.log('This is only called if submission validation succeeds!');
});

handleSubmit(); // Trigger submission
```

More info on submission can be [found here](https://fielder.andyrichardson.dev/guides/submission).

### Breaking changes

- `initialValue` argument on the `useField` hook is now required [(more info)](https://fielder.andyrichardson.dev/api/useField#initialvalue-required)
- `validate` argument on the `useField` hook now receives only a single argument [(more info)](https://fielder.andyrichardson.dev/guides/validation#basic-validation)
- removed deprecated properties `touched` and `initalTouched` on the `useField` hook [(more info)](https://fielder.andyrichardson.dev/api/useField#arguments)
- removed `initialValid` and `initialError` arguments on the `useField` hook in favor of validation events [(more info)](https://fielder.andyrichardson.dev/guides/validation#validation-events)
- removed `validateOnBlur`, `validateOnChange`, and `validateOnUpdate` arguments on the `useField` hook in favor of validation events [(more info)](https://fielder.andyrichardson.dev/guides/validation#validation-events)
- removed support for returning validation errors as strings without throwing [(more info)](https://fielder.andyrichardson.dev/api/useField#validate)

### Breaking changes

####

[Full Changelog](https://github.com/andyrichardson/fielder/compare/v1.3.1...v2.0.0)

## [v1.3.1](https://github.com/andyrichardson/fielder/tree/v1.3.1) (2020-07-30)

[Full Changelog](https://github.com/andyrichardson/fielder/compare/v1.3.0...v1.3.1)

**Fixed bugs:**

- Changes to validation arg doesn't update validation function [\#235](https://github.com/andyrichardson/fielder/issues/235)

**Merged pull requests:**

- Add setFieldState call to useField on validation change [\#278](https://github.com/andyrichardson/fielder/pull/278) ([andyrichardson](https://github.com/andyrichardson))

## [v1.3.0](https://github.com/andyrichardson/fielder/tree/v1.3.0) (2020-06-14)

[Full Changelog](https://github.com/andyrichardson/fielder/compare/v1.2.1...v1.3.0)

**Additions:**

- Add support for providing value to `onChange` [\#41](https://github.com/andyrichardson/fielder/issues/41)
- Add support for React Native [\#35](https://github.com/andyrichardson/fielder/issues/35)
- Add non DOM event support to onChange [\#123](https://github.com/andyrichardson/fielder/pull/123) ([andyrichardson](https://github.com/andyrichardson))

**Closed issues:**

- Add sitemap to docs [\#49](https://github.com/andyrichardson/fielder/issues/49)
- Update branching example to use consistent theming [\#47](https://github.com/andyrichardson/fielder/issues/47)

**Merged pull requests:**

- Add native example [\#124](https://github.com/andyrichardson/fielder/pull/124) ([andyrichardson](https://github.com/andyrichardson))
- Update readme with video [\#122](https://github.com/andyrichardson/fielder/pull/122) ([andyrichardson](https://github.com/andyrichardson))
- Add e2e for example 3 [\#84](https://github.com/andyrichardson/fielder/pull/84) ([andyrichardson](https://github.com/andyrichardson))
- Add sitemap generation on build [\#83](https://github.com/andyrichardson/fielder/pull/83) ([andyrichardson](https://github.com/andyrichardson))
- Keep styling consistent between examples [\#48](https://github.com/andyrichardson/fielder/pull/48) ([andyrichardson](https://github.com/andyrichardson))

## [v1.2.1](https://github.com/andyrichardson/fielder/tree/v1.2.1) (2020-02-25)

[Full Changelog](https://github.com/andyrichardson/fielder/compare/v1.2.0...v1.2.1)

**Fixed bugs:**

- Duplicate field - add warning instead of error [\#45](https://github.com/andyrichardson/fielder/pull/45) ([andyrichardson](https://github.com/andyrichardson))

**Closed issues:**

- Add docs for `branching` [\#26](https://github.com/andyrichardson/fielder/issues/26)

**Merged pull requests:**

- Add example branching [\#46](https://github.com/andyrichardson/fielder/pull/46) ([andyrichardson](https://github.com/andyrichardson))

## [v1.2.0](https://github.com/andyrichardson/fielder/tree/v1.2.0) (2020-02-05)

[Full Changelog](https://github.com/andyrichardson/fielder/compare/v1.1.2...v1.2.0)

**Breaking changes:**

- Revert checked state managment using ref [\#39](https://github.com/andyrichardson/fielder/issues/39)
- Remove checkbox refs [\#40](https://github.com/andyrichardson/fielder/pull/40) ([andyrichardson](https://github.com/andyrichardson))

**Additions:**

- Add tracking of 'hasChanged' and 'hasBlurred' states [\#21](https://github.com/andyrichardson/fielder/issues/21)

**Merged pull requests:**

- Use 'latest' tag for dependencies examples [\#43](https://github.com/andyrichardson/fielder/pull/43) ([andyrichardson](https://github.com/andyrichardson))
- Update checkbox docs [\#42](https://github.com/andyrichardson/fielder/pull/42) ([andyrichardson](https://github.com/andyrichardson))
- Add cypress integration [\#38](https://github.com/andyrichardson/fielder/pull/38) ([andyrichardson](https://github.com/andyrichardson))
- Add hasChanged and hasBlurred props to useField [\#37](https://github.com/andyrichardson/fielder/pull/37) ([andyrichardson](https://github.com/andyrichardson))
- Update examples [\#36](https://github.com/andyrichardson/fielder/pull/36) ([andyrichardson](https://github.com/andyrichardson))

## [v1.1.2](https://github.com/andyrichardson/fielder/tree/v1.1.2) (2020-01-21)

[Full Changelog](https://github.com/andyrichardson/fielder/compare/v1.1.1...v1.1.2)

**Fixed bugs:**

- Fix initial value for radio inputs [\#30](https://github.com/andyrichardson/fielder/issues/30)
- Fix initial value for checkbox inputs [\#28](https://github.com/andyrichardson/fielder/issues/28)
- Textarea onChange error [\#24](https://github.com/andyrichardson/fielder/issues/24)

**Closed issues:**

- Add examples for validation and conditional rendering [\#33](https://github.com/andyrichardson/fielder/issues/33)
- Add documentation for checkbox inputs [\#23](https://github.com/andyrichardson/fielder/issues/23)
- Explain how to handle submission of field values [\#22](https://github.com/andyrichardson/fielder/issues/22)

**Merged pull requests:**

- Add conditional examples for validation [\#34](https://github.com/andyrichardson/fielder/pull/34) ([andyrichardson](https://github.com/andyrichardson))
- Add docs for radio / checkbox usage [\#32](https://github.com/andyrichardson/fielder/pull/32) ([andyrichardson](https://github.com/andyrichardson))
- Fix radio input [\#31](https://github.com/andyrichardson/fielder/pull/31) ([andyrichardson](https://github.com/andyrichardson))
- Add mutation of checkbox element on ref and value change [\#29](https://github.com/andyrichardson/fielder/pull/29) ([andyrichardson](https://github.com/andyrichardson))
- Add textarea support [\#27](https://github.com/andyrichardson/fielder/pull/27) ([andyrichardson](https://github.com/andyrichardson))

## [v1.1.1](https://github.com/andyrichardson/fielder/tree/v1.1.1) (2020-01-10)

[Full Changelog](https://github.com/andyrichardson/fielder/compare/v1.1.0...v1.1.1)

**Fixed bugs:**

- Handle destroy on unmount changing value [\#18](https://github.com/andyrichardson/fielder/issues/18)

**Merged pull requests:**

- Update deps [\#20](https://github.com/andyrichardson/fielder/pull/20) ([andyrichardson](https://github.com/andyrichardson))
- Add detection for destroyOnUnmount change [\#19](https://github.com/andyrichardson/fielder/pull/19) ([andyrichardson](https://github.com/andyrichardson))

## [v1.1.0](https://github.com/andyrichardson/fielder/tree/v1.1.0) (2020-01-09)

[Full Changelog](https://github.com/andyrichardson/fielder/compare/v1.0.3...v1.1.0)

**Breaking changes:**

- Fields without validation should be valid by default [\#11](https://github.com/andyrichardson/fielder/issues/11)

**Closed issues:**

- Add docs [\#4](https://github.com/andyrichardson/fielder/issues/4)

**Merged pull requests:**

- Setup linting [\#16](https://github.com/andyrichardson/fielder/pull/16) ([andyrichardson](https://github.com/andyrichardson))
- Default to valid when no validation is set [\#15](https://github.com/andyrichardson/fielder/pull/15) ([andyrichardson](https://github.com/andyrichardson))
- Add docs [\#5](https://github.com/andyrichardson/fielder/pull/5) ([andyrichardson](https://github.com/andyrichardson))

## [v1.0.3](https://github.com/andyrichardson/fielder/tree/v1.0.3) (2019-12-22)

[Full Changelog](https://github.com/andyrichardson/fielder/compare/v1.0.2...v1.0.3)

**Fixed bugs:**

- Error thrown when using checkboxes [\#6](https://github.com/andyrichardson/fielder/issues/6)
- No `dist` in published version 1.0.0 [\#1](https://github.com/andyrichardson/fielder/issues/1)

**Closed issues:**

- Remove unnecessary dependency "react-dom" [\#8](https://github.com/andyrichardson/fielder/issues/8)

**Merged pull requests:**

- Changelog guide + version bump [\#10](https://github.com/andyrichardson/fielder/pull/10) ([andyrichardson](https://github.com/andyrichardson))
- Remove react-dom [\#9](https://github.com/andyrichardson/fielder/pull/9) ([andyrichardson](https://github.com/andyrichardson))
- Fix checkbox issue [\#7](https://github.com/andyrichardson/fielder/pull/7) ([andyrichardson](https://github.com/andyrichardson))
- Remove `;` [\#2](https://github.com/andyrichardson/fielder/pull/2) ([jontansey](https://github.com/jontansey))

## [v1.0.2](https://github.com/andyrichardson/fielder/tree/v1.0.2) (2019-11-27)

[Full Changelog](https://github.com/andyrichardson/fielder/compare/bc3999d02980d5028bd094ca0afc59f9d72f1340...v1.0.2)
