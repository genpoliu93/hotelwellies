declare module "@/components/payment/payment-summary" {
  export interface PaymentSummaryProps {
    checkInDate: Date | null;
    checkOutDate: Date | null;
    roomId: string | null;
    price: number;
    adults: number;
    children: number;
    selectedPackageCode?: string;
  }

  export function PaymentSummary(props: PaymentSummaryProps): JSX.Element;
}

declare module "@/components/payment/customer-info" {
  export interface CustomerInfoProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }

  export function CustomerInfo(props: CustomerInfoProps): JSX.Element;
}

declare module "@/components/payment/payment-form" {
  export interface PaymentFormProps {
    price: number;
    checkInDate: Date | null;
    checkOutDate: Date | null;
    roomId: string | null;
    adults: number;
    children: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    arrivalTime: string;
    specialRequests?: string;
    selectedPackageCode?: string;
  }

  export function PaymentForm(props: PaymentFormProps): JSX.Element;
}

declare module "@/components/payment/terms-conditions" {
  export function TermsConditions(): JSX.Element;
}

declare module "@/components/payment/booking-confirmation" {
  export interface BookingConfirmationProps {
    bookingReference: string;
    checkInDate: Date | null;
    checkOutDate: Date | null;
    roomType: string;
    price: number;
    guests: {
      adults: number;
      children: number;
    };
    customer: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      country: string;
      specialRequests?: string;
    };
    payment: {
      method: string;
      status: string;
      id?: string;
    };
  }

  export function BookingConfirmation(
    props: BookingConfirmationProps
  ): JSX.Element;
}
