"use client"

import { Fragment } from "react"

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Fragment>
      {children}
    </Fragment>
  );
}
export default Providers

