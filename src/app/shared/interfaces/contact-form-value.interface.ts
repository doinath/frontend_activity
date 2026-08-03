/** @description Shape of the contact form payload submitted to ContactService. */
export interface ContactFormValue {
  fullName: string;
  email: string;
  phone: string;
  market: string;
  message: string;
}
