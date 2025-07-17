declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'pricing-table-id': string;
        'publishable-key': string;
      }, HTMLElement>;
    }
  }
}

interface StripePricingTableProps {
  pricingTableId: string;
  publishableKey: string;
  email: string;
}

export function StripePricingTable({ pricingTableId, publishableKey, email }: StripePricingTableProps) {
  return (
    <>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table
        pricing-table-id={pricingTableId}
        publishable-key={publishableKey}
        customer-email={email}
      />
    </>
  );
}
