import { Fragment } from 'react';
import {
  FpjsProvider,
} from '@fingerprintjs/fingerprintjs-pro-react'

const FINGERPRINTJS_API_KEY = process.env.NEXT_PUBLIC_FINGERPRINTJS_API_KEY;

interface FingerprintProps {
    children: React.ReactNode
}

const Fingerprint = ({ children }: FingerprintProps) => {
  // Just return children without FingerprintJS
  return <Fragment>{children}</Fragment>
  
  // Commented out FingerprintJS integration
  /*
  if (!FINGERPRINTJS_API_KEY) {
    return <Fragment>{children}</Fragment>
  }

  return (
    <FpjsProvider
      loadOptions={{
        apiKey: FINGERPRINTJS_API_KEY,
      }}
    >
      {children}
    </FpjsProvider>
  )
  */
}

export default Fingerprint;
