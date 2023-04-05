import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from '@stacks/ui';
import { Form, Formik } from 'formik';

import { useAuth } from '@components/auth-provider/auth-provider';
import { CenteredErrorAlert } from '@components/centered-error-alert';
import { CenteredSpinner } from '@components/centered-spinner';
import { useNetwork } from '@components/network-provider';
import {
  useGetStatusQuery,
  useStackingClient,
} from '@components/stacking-client-provider/stacking-client-provider';

import { SelfServiceLayout } from './components/self-service-extend-layout';
import { createHandleSubmit } from './utils';

export function SelfServiceExtend() {
  const navigate = useNavigate();
  const getStatusQuery = useGetStatusQuery();

  const { client } = useStackingClient();
  const { address: stacker } = useAuth();
  const { network } = useNetwork();

  const [isContractCallExtensionPageOpen, setIsContractCallExtensionPageOpen] = useState(false);

  if (getStatusQuery.isLoading) {
    return <CenteredSpinner />;
  }

  if (getStatusQuery.isError || !getStatusQuery.data || !client) {
    const msg = 'Error while loading data, try reloading the page.';
    console.error(msg);
    return (
      <CenteredErrorAlert id="0abc083b-06c7-4795-8491-68264595f1b4">
        <Text>{msg}</Text>
      </CenteredErrorAlert>
    );
  }

  const stackerInfoDetails = getStatusQuery.data?.stacked
    ? getStatusQuery.data?.details
    : undefined;

  const handleSubmit = createHandleSubmit({
    client,
    navigate,
    setIsContractCallExtensionPageOpen,
    network,
  });
  return (
    <Formik
      initialValues={{ stacker: stacker || '' }}
      onSubmit={handleSubmit}
      //validationSchema={validationSchema}
    >
      <Form>
        <SelfServiceLayout
          title="Continue stacking"
          details={stackerInfoDetails}
          isContractCallExtensionPageOpen={isContractCallExtensionPageOpen}
        />
      </Form>
    </Formik>
  );
}
