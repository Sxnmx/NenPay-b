// Currency conversion system with static exchange rates
// Base currency: NGN (Nigerian Naira)

export const CURRENCIES = {
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 1, locale: 'en-NG' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.00067, locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.00062, locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.00053, locale: 'en-GB' },
  ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 0.012, locale: 'en-ZA' },
  GHS: { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', rate: 0.0082, locale: 'en-GH' },
  KES: { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rate: 0.087, locale: 'en-KE' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.00091, locale: 'en-CA' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.0010, locale: 'en-AU' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 0.10, locale: 'ja-JP' },
  CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 0.0048, locale: 'zh-CN' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 0.056, locale: 'en-IN' },
};

// Convert NGN to target currency
export const convertFromNGN = (amountInNGN, targetCurrency) => {
  const currency = CURRENCIES[targetCurrency];
  if (!currency) return amountInNGN;
  return amountInNGN * currency.rate;
};

// Convert from any currency to NGN
export const convertToNGN = (amount, fromCurrency) => {
  const currency = CURRENCIES[fromCurrency];
  if (!currency) return amount;
  return amount / currency.rate;
};

// Format currency nicely
export const formatCurrency = (amountInNGN, currencyCode = 'NGN') => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.NGN;
  const converted = convertFromNGN(amountInNGN, currencyCode);
  
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(converted);
  } catch {
    // Fallback
    return `${currency.symbol}${converted.toFixed(2)}`;
  }
};

// Simple formatter (uses symbol)
export const formatSimple = (amountInNGN, currencyCode = 'NGN') => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.NGN;
  const converted = convertFromNGN(amountInNGN, currencyCode);
  return `${currency.symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};