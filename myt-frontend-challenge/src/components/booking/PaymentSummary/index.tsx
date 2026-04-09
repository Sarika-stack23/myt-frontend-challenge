import { PaymentSummary as PaymentSummaryType } from '@/types/booking';
import { formatPrice } from '@/utils/formatPrice';
import { clsx } from 'clsx';

export interface PaymentSummaryProps {
  summary: PaymentSummaryType;
  className?: string;
}

interface LineItemProps {
  label: string;
  amount: number;
  currency: string;
  bold?: boolean;
}

const LineItem = ({ label, amount, currency, bold }: LineItemProps) => (
  <div
    className={clsx(
      'flex items-center justify-between py-2',
      bold && 'font-semibold text-gray-900'
    )}
  >
    <span className={bold ? 'text-gray-900' : 'text-gray-600'}>{label}</span>
    <span>{formatPrice(amount, currency)}</span>
  </div>
);

export const PaymentSummary = ({
  summary,
  className,
}: PaymentSummaryProps) => {
  return (
    <section
      aria-label="Payment summary"
      className={clsx(
        'bg-gray-50 rounded-xl p-4 border border-gray-200',
        className
      )}
    >
      <h3 className="font-semibold text-gray-900 mb-3">Payment Summary</h3>
      <div className="divide-y divide-gray-200">
        <LineItem
          label="Subtotal"
          amount={summary.subtotal}
          currency={summary.currency}
        />
        <LineItem
          label="Tax (10%)"
          amount={summary.tax}
          currency={summary.currency}
        />
        <LineItem
          label="Total"
          amount={summary.total}
          currency={summary.currency}
          bold
        />
      </div>
    </section>
  );
};

export default PaymentSummary;
