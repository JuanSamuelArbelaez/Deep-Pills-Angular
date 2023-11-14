// password-recovery-dto.ts
export class PasswordRecoveryDTO {
  constructor(
    public passwordRecoveryRequestId: number,
    public email: string,
    public code: string,
    public password: string
  ) {}
}
