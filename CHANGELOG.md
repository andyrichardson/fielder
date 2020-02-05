# Changelog

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
- Add submission docs [\#25](https://github.com/andyrichardson/fielder/pull/25) ([andyrichardson](https://github.com/andyrichardson))

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
- Add coverage [\#13](https://github.com/andyrichardson/fielder/pull/13) ([andyrichardson](https://github.com/andyrichardson))
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



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator)*
