import { customAlphabet } from 'nanoid';

export const nanoid2 = customAlphabet('1234567890', 13);

export const generateOrderId = function () {
  return getCurrentDateFormatted() + nanoid2();
};

function getCurrentDateFormatted() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}
