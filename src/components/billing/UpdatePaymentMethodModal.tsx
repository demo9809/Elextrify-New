import { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UpdatePaymentMethodModalProps {
  onClose: () => void;
}

export default function UpdatePaymentMethodModal({ onClose }: UpdatePaymentMethodModalProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substring(0, 19); // Max 16 digits + 3 spaces
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    setFormData({ ...formData, cardNumber: formatted });
  };

  const detectCardBrand = (number: string): string => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5')) return 'mastercard';
    if (cleaned.startsWith('34') || cleaned.startsWith('37')) return 'amex';
    if (cleaned.startsWith('6')) return 'discover';
    return 'unknown';
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const cleanedCard = formData.cardNumber.replace(/\s/g, '');
    if (!cleanedCard) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cleanedCard.length < 13 || cleanedCard.length > 19) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Name on card is required';
    }

    if (!formData.expiryMonth) {
      newErrors.expiryMonth = 'Required';
    } else if (parseInt(formData.expiryMonth) < 1 || parseInt(formData.expiryMonth) > 12) {
      newErrors.expiryMonth = 'Invalid';
    }

    if (!formData.expiryYear) {
      newErrors.expiryYear = 'Required';
    } else if (parseInt(formData.expiryYear) < new Date().getFullYear() % 100) {
      newErrors.expiryYear = 'Expired';
    }

    if (!formData.cvv) {
      newErrors.cvv = 'Required';
    } else if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      newErrors.cvv = 'Invalid';
    }

    if (!formData.zipCode) {
      newErrors.zipCode = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast.error('Please fix the errors before continuing');
      return;
    }

    const brand = detectCardBrand(formData.cardNumber);
    const lastFour = formData.cardNumber.replace(/\s/g, '').slice(-4);

    toast.success('Payment method updated successfully!', {
      description: `${brand.toUpperCase()} ending in ${lastFour} is now your default payment method.`,
    });

    onClose();
  };

  const currentYear = new Date().getFullYear() % 100;
  const years = Array.from({ length: 15 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const cardBrand = detectCardBrand(formData.cardNumber);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Update Payment Method</h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Add or update your payment information
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Banner */}
        <div className="p-4 bg-blue-50 border-b border-blue-200 flex items-center gap-3">
          <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900">Secure Payment</p>
            <p className="text-xs text-blue-800 mt-0.5">
              Your payment information is encrypted and secure. We never store your full card details.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Card Number <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={`w-full h-[44px] pl-4 pr-12 border ${
                  errors.cardNumber ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
              />
              {cardBrand !== 'unknown' && formData.cardNumber.length > 4 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CreditCard className="w-5 h-5 text-[#6B7280]" />
                </div>
              )}
            </div>
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-[#DC2626] flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.cardNumber}
              </p>
            )}
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Name on Card <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={formData.cardName}
              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
              placeholder="John Smith"
              className={`w-full h-[44px] px-4 border ${
                errors.cardName ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
              } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
            />
            {errors.cardName && (
              <p className="mt-1 text-sm text-[#DC2626]">{errors.cardName}</p>
            )}
          </div>

          {/* Expiry & CVV */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Month <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={formData.expiryMonth}
                onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                className={`w-full h-[44px] px-3 border ${
                  errors.expiryMonth ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
              >
                <option value="">MM</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              {errors.expiryMonth && (
                <p className="mt-1 text-xs text-[#DC2626]">{errors.expiryMonth}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Year <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={formData.expiryYear}
                onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                className={`w-full h-[44px] px-3 border ${
                  errors.expiryYear ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
              >
                <option value="">YY</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.expiryYear && (
                <p className="mt-1 text-xs text-[#DC2626]">{errors.expiryYear}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                CVV <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').substring(0, 4) })}
                placeholder="123"
                maxLength={4}
                className={`w-full h-[44px] px-4 border ${
                  errors.cvv ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
              />
              {errors.cvv && (
                <p className="mt-1 text-xs text-[#DC2626]">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Billing Zip Code */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Billing ZIP Code <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              placeholder="10001"
              className={`w-full h-[44px] px-4 border ${
                errors.zipCode ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
              } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-[#DC2626]">{errors.zipCode}</p>
            )}
          </div>

          {/* Features */}
          <div className="pt-4 border-t border-[#E5E7EB] space-y-2">
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>256-bit SSL encryption</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>PCI DSS compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Card details are tokenized and never stored</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-[#E5E7EB] bg-[#F9FAFB]">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Save Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
