import React from 'react';
import { UseFieldMeta } from 'fielder';
import { Label } from 'semantic-ui-react';

export const conditionalError = (meta: UseFieldMeta) =>
  meta.touched &&
  meta.error && (
    <Label basic color="red" pointing="above">
      {meta.error}
    </Label>
  );
