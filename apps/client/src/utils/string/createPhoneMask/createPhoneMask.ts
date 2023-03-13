export const createPhoneMask = (phone: string, mask = '+# (###) ###-##-##') => {
  const trigger = '#';
  const cleanPhoneNumber = phone.replace(/\D+/g, '');

  for (const char of cleanPhoneNumber) {
    mask = mask.replace(trigger, char);
  }

  return mask.replaceAll(trigger, '');
};
