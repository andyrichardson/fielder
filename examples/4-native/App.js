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

const TextInput = () => {
  // 'onChange' expects a new value (or event)
  // For NativeBase and Native, this prop is called onChangeText
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

const PickerInput = () => {
  // 'onChange' expects a new value (or event)
  // For NativeBase and Native, this prop is called onChangeText
  const [
    { onChange: onValueChange, value: selectedValue, ...pickerProps }
  ] = useField({
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
