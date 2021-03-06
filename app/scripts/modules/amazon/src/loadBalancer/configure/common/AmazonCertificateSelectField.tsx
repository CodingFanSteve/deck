import * as React from 'react';
import Select, { Option } from 'react-select';
import { Overridable } from '@spinnaker/core';

import { IAmazonCertificate } from 'amazon/domain';

export interface IAmazonCertificateSelectFieldProps {
  certificates: { [accountName: string]: IAmazonCertificate[] };
  accountName: string;
  currentValue: string;
  onCertificateSelect: (certificateName: string) => void;
}

@Overridable('amazon.certificateSelectField')
export class AmazonCertificateSelectField extends React.Component<IAmazonCertificateSelectFieldProps> {
  public shouldComponentUpdate(nextProps: Readonly<IAmazonCertificateSelectFieldProps>): boolean {
    return (
      nextProps.currentValue !== this.props.currentValue ||
      nextProps.accountName !== this.props.accountName ||
      nextProps.certificates !== this.props.certificates
    );
  }

  public render() {
    const { certificates, accountName, onCertificateSelect, currentValue } = this.props;
    const certificatesForAccount = certificates[accountName] || [];
    const certificateOptions = certificatesForAccount.map(cert => {
      return { label: cert.serverCertificateName, value: cert.serverCertificateName };
    });
    return (
      <Select
        className="input-sm"
        wrapperStyle={{ width: '100%' }}
        clearable={false}
        required={true}
        options={certificateOptions}
        onChange={(value: Option<string>) => onCertificateSelect(value.value)}
        value={currentValue}
      />
    );
  }
}
