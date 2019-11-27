import React from "react";
import { Radio } from "antd";

export const RadioGroup = props => (
  <Radio.Group
    {...props}
    onChange={e => {
      const event = { ...e.nativeEvent, currentTarget: e.nativeEvent.target }; // Required due to how antd presents events
      props.onChange(event);
      props.onBlur(event);
    }}
  ></Radio.Group>
);
