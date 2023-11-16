export class PasswordRecoveryDTO {
  constructor(
    public passwordRecoveryRequestId: number,
    public email: string,
    public code: string,
    public password: string
  ) {}
}

export class TokenDTO {
  constructor(
    public token: string
  ) {}
}

export class LoginDTO {
  constructor(
    public email: string,
    public password: string
  ) {}
}

export class ResponseDTO{
  constructor(
    public errors: boolean,
    public message: any
  ) {}
}

export class AppointmentScheduleDTO {
    constructor(
      public patientPersonalId: string,
      public physicianPersonalId: string,
      public reasons: string,
      public scheduleId: number,
      public time: Date
    ) {}
  }
  
export class AppointmentDatePatientSearchDTO {
  constructor(
    public patientPersonalId: string,
    public date: Date
    ) {}
}
  
  export class AppointmentRescheduleDTO {
    constructor(
      public appointmentId: number,
      public scheduleId: number,
      public patientPersonalId: string,
      public physicianPersonalId: string,
      public time: Date
    ) {}
  }
  
  export class AppointmentGenericDTO {
    constructor(
      public appointmentId: number,
      public personalId: string,
      public date: Date,
      public time: Date,
      public duration: number,
      public appointmentState: string
    ) {}
  }
  
  export class PhysicianListingItemPatientDTO {
    constructor(
      public physicianId: number,
      public name: string,
      public lastName: string
    ) {}
  }

  export class PhysicianSearchDTO {
    constructor(
      public searchParameter: number,
      public searchValue: string
    ) {}
  }

  export class ClaimDetailedItemPatientDTO {
    constructor(claimId: number,
      public personalId: string,
      public appointmentId: number,
      public claimDate: Date,
      public claimType: string,
      public details: string,
      public claimStatus: string
      ){}
  }
  
  export class ClaimItemPatientDTO {
    constructor(
      public claimId: number,
      public claimDate: Date,
      public claimType: string,
      public claimStatus: string
    ){}
  }
  
  export class ClaimListingPatientDTO {
    constructor(
      public patientPersonalId: string,
      public claimState: string
    ) {}
  }
  
  export class  ClaimRegisterDTO {
    constructor(
      public patientPersonalId: string,
      public appointmentId: number,
      public claimType: string,
      public details: string
    ){}
  }
  
  export class ClaimSearchDTO {
    constructor(
      public claimId: number,
      public patientPersonalId: string
    ){}
  }
  
  export class ClaimAnswerDTO {
    constructor(
      public claimId: number,
      public text: string,
      public messageType: string
    ){}
  }

  export class MembershipPatientModificationDTO {
    constructor(
      public membershipId: number,
      public ownerPersonalId: string,
      public patientPersonalId: string
    ) {}
  }
  
  export class MembershipAcquirementDTO {
    constructor(
      public patientPersonalId: string,
      public policyId: number
    ) {}
  }
  
  export class MembershipPaymentDTO {
    constructor(
      public patientPersonalId: string,
      public membershipChargeId: number,
      public amount: number
    ) {}
  }
  
  export class PaymentDTO {
    constructor(
      public membershipPaymentId: number,
      public amount: number,
      public dateTime: Date,
      public concept: string,
      public paymentState: string
    ) {}
  }
  
  export class ChargeDTO {
    constructor(
      public membershipChargeId: number,
      public chargeAmount: number,
      public chargeState: string,
      public dateTime: Date
    ) {}
  }

  export class PaymentListDTO {
    constructor(
      public patientPersonalId: string,
      public chargeId: number
    ) {}
  }
  
  export class ChargeListDTO {
    constructor(
      public patientPersonalId: string,
      public membershipId: number
    ) {}
  }

  export class RegisterPatientDTO {
    constructor(
      public email: string,
      public password: string,
      public personalId: string
    ) {}
  }

  export class InfoLoadPatientDTO {
    constructor(
      public id: number,
      public name: string | null = null,
      public lastName: string | null = null,
      public dateOfBirth: Date | null = null,
      public phone: string | null = null,
      public email: string | null = null,
      public city: string | null = null,
      public pictureUrl: string | null = null,
      public bloodType: string | null = null,
      public eps: string | null = null,
      public allergies: string[] | null = null
    ) {}
  }
  
  export class InfoUpdatePatientDTO {
    constructor(
      public id: number,
      public name: string,
      public lastName: string,
      public dateOfBirth: Date,
      public phone: string,
      public email: string,
      public city: string,
      public pic: File,
      public bloodType: string,
      public eps: string,
      public allergies: string[],
    ) {}
  }
  