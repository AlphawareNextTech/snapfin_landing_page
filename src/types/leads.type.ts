 export interface LeadFormData {
  name: string;
  city:string;
  // email:string;
  mobileNumber: string;
  loanType: string;
  panNumber: string;
  pincode: string;
  loanAmount: string;
  employmentType: string;
  propertyType: string;
  organisationName: string;
  businessVintage: string;
  businessType: string;
  consent: boolean;
}

export interface EligibilityLocationState {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  loanType?: string;
}
