import React, { useMemo, useCallback } from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Input,
  Picker,
  View,
  ListItem,
  CheckBox,
  Body
} from 'native-base';
import { useForm, FielderProvider, useField } from 'fielder';

export default function App() {
  return (
    <Container>
      <Content>
        <FormRoot />
      </Content>
    </Container>
  );
}

const FormRoot = () => {
  const formState = useForm();

  return (
    <FielderProvider value={formState}>
      <TextInput />
      <PickerInput />
      <CheckboxInput />
      <Button disabled={!formState.isValid}>
        <Text>Submit</Text>
      </Button>
    </FielderProvider>
  );
};

/**
 * Here's an example of adapting Fielder props to work with
 * the Input component in NativeBase.
 *
 * 'onChange' expects a new value (or DOM event)
 * NativeBase's Input uses the prop 'onChangeText' for this purpose.
 */
const TextInput = () => {
  const [{ onChange: onChangeText, ...textProps }, fieldMeta] = useField({
    name: 'textinput',
    initialValue: '',
    validate: useCallback(v => {
      if (!v) {
        throw Error('Text is required');
      }
    }, [])
  });

  return (
    <Section>
      <Text>Type some text</Text>
      <Input
        placeholder="Text input"
        {...textProps}
        onChangeText={onChangeText}
      />
      {fieldMeta.hasBlurred && fieldMeta.error ? (
        <ErrorMessage>{fieldMeta.error}</ErrorMessage>
      ) : null}
    </Section>
  );
};

/**
 * Here's an example of adapting Fielder props to work with
 * the Picker component in NativeBase.
 *
 * 'onChange' expects a new value (or DOM event)
 * NativeBase's Picker uses the prop 'onChangeValue' for this purpose.
 *
 * 'value' returns the current value of the field
 * NativeBase's Picker uses the prop 'selectedValue' for this purpose.
 *
 * NativeBase's Picker doesn't have an onBlur so we don't forward
 * that prop or use 'hasBlurred' from Fielder as it will always be false.
 */
const PickerInput = () => {
  const [{ onChange: onValueChange, value: selectedValue }] = useField({
    name: 'pickerinput',
    initialValue: 'credit'
  });

  const pickerValues = useMemo(
    () => [
      { label: 'Wallet', value: 'wallet' },
      { label: 'ATM Card', value: 'atm' },
      { label: 'Debit Card', value: 'debit' },
      { label: 'Credit Card', value: 'credit' }
    ],
    []
  );

  return (
    <Section>
      <Text>Select from the Picker</Text>
      <Picker
        note
        mode="dropdown"
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {pickerValues.map(v => (
          <Picker.Item key={v.value} {...v} />
        ))}
      </Picker>
    </Section>
  );
};

/**
 * Here's an example of adapting Fielder props to work with
 * the Checkbox component in NativeBase.
 *
 * 'onChange' expects a new value (or DOM event)
 * NativeBase's Checkbox uses the 'onPress' and does not provide the pressed value.
 */
const CheckboxInput = () => {
  const [{ value, onChange }, fieldMeta] = useField({
    name: 'checkboxinput',
    initialValue: ['A', 'C'],
    validate: useCallback(v => {
      if (v.length === 0) {
        throw Error('Must select at least one checkbox');
      }
    }),
    initialValid: true
  });

  return (
    <>
      <Section>
        <Text>Try selecting some checkboxes</Text>
        {['A', 'B', 'C', 'D'].map(v => (
          <ListItem key={v}>
            <CheckBox checked={value.includes(v)} onPress={() => onChange(v)} />
            <Body>
              <Text>{v}</Text>
            </Body>
          </ListItem>
        ))}
        {fieldMeta.error ? (
          <ErrorMessage>{fieldMeta.error}</ErrorMessage>
        ) : null}
      </Section>
    </>
  );
};

const Section = props => (
  <View
    style={{
      flex: 1,
      padding: 20
    }}
    {...props}
  />
);

const ErrorMessage = props => <Text {...props} style={{ color: 'red' }} />;
