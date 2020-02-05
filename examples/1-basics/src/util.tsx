import React from 'react';
import { UseFieldMeta } from 'fielder';
import { Label } from 'semantic-ui-react';

export const conditionalError = (meta: UseFieldMeta) =>
  meta.hasBlurred &&
  meta.error && (
    <Label basic color="red" pointing="above">
      {meta.error}
    </Label>
  );
