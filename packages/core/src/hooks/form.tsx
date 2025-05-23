import { createFormHook } from '@tanstack/react-form';
import { lazy } from 'react';
import { fieldContext, formContext, useFormContext } from './form-context.tsx';
import { Button } from '@linkbcms/ui/components/button';
import type { JSX } from 'react/jsx-runtime';

const TextField = lazy(() => import('@/components/fields/text-fields.tsx'));
const NumberField = lazy(() => import('@/components/fields/number-fields.tsx'));
const SelectField = lazy(() => import('@/components/fields/select-fields.tsx'));

function SubscribeButton({ label }: { label: string }): JSX.Element {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <Button disabled={isSubmitting}>{label}</Button>}
    </form.Subscribe>
  );
}

const dest: any = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
    SelectField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});

const useAppForm = dest.useAppForm as typeof dest.useAppForm;
const withForm = dest.withForm as typeof dest.withForm;

export { useAppForm, withForm };
