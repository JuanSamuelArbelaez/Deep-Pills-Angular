import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as dtos from '../models/model-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = environment.apiBaseUrl+'/patient'

  constructor(private httpClient: HttpClient) { }

  //Account Section --->
  updatePatientInfo(infoUpdatePatientDTO: dtos.InfoUpdatePatientDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/account/info-update`;
    return this.httpClient.post<dtos.ResponseDTO>(url, infoUpdatePatientDTO);
  }

  loadPatientInfo(patientId: number): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/account/load-info/${patientId}`;
    return this.httpClient.get<dtos.ResponseDTO>(url);
  }


  //Appointment Section --->

  scheduleAppointment(appointmentScheduleDTO: dtos.AppointmentScheduleDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/appointments/schedule-appointment`;
    return this.httpClient.request<dtos.ResponseDTO>("put", url, { body: appointmentScheduleDTO }  );
  }

  rescheduleAppointment(appointmentRescheduleDTO: dtos.AppointmentRescheduleDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/appointments/reschedule-appointment`;
    return this.httpClient.request<dtos.ResponseDTO>("post", url, { body: appointmentRescheduleDTO }  );
  }

  cancelAppointment(appointmentId: number): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/appointments/cancel-appointment/${appointmentId}`;
    return this.httpClient.request<dtos.ResponseDTO>("post", url);
  }

  getAllAppointments(patientPersonalId: string): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/appointments/list-all/${patientPersonalId}`;
    return this.httpClient.get<dtos.ResponseDTO>(url);
  }

  getUpcomingAppointments(patientPersonalId: string): Observable<dtos.ResponseDTO>{
    const url = `${this.baseUrl}/appointments/list-upcoming/${patientPersonalId}`;
    return this.httpClient.get<dtos.ResponseDTO>(url)
  }

  getPastAppointments(patientPersonalId: string): Observable<dtos.ResponseDTO>{
    const url = `${this.baseUrl}/appointments/list-past/${patientPersonalId}`;
    return this.httpClient.get<dtos.ResponseDTO>(url)
  }

  getDateAppointments(appointmentDatePatientSearchDTO: dtos.AppointmentDatePatientSearchDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/appointments/list-date`;
    return this.httpClient.request<dtos.ResponseDTO>("get", url, { body:appointmentDatePatientSearchDTO }  );
}
  
  listPhysicians(physicianSearchDTO: dtos.PhysicianSearchDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/appointments/list-physicians`;
    return this.httpClient.request<dtos.ResponseDTO>("get", url, { body:physicianSearchDTO }  );
  }

  getAppointmentDetails(appoinmentId: number): Observable<dtos.ResponseDTO>{
    const url = `${this.baseUrl}/appointments/details/${appoinmentId}`;
    return this.httpClient.get<dtos.ResponseDTO>(url)
  }

  //Claims Section --->

  newClaim(claimRegisterDTO: dtos.ClaimRegisterDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/claims/new-claim`;
    return this.httpClient.put<dtos.ResponseDTO>(url, claimRegisterDTO);
  }

  addMessage(claimAnswerDTO: dtos.ClaimAnswerDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/claims/add-message`;
    return this.httpClient.put<dtos.ResponseDTO>(url, claimAnswerDTO);
  }

  listAllSolvedClaims(claimListingPatientDTO: dtos.ClaimListingPatientDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/claims/list-by-status`;
    return this.httpClient.request<dtos.ResponseDTO>("get", url, { body: claimListingPatientDTO }  );
  }

  listAllClaims(patientPersonalId: string): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/claims/list-all/${patientPersonalId}`;
    return this.httpClient.request<dtos.ResponseDTO>("get", url);
  }

  searchClaim(claimSearchDTO: dtos.ClaimSearchDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/claims/claim-search`;
    return this.httpClient.request<dtos.ResponseDTO>("get", url, {body: claimSearchDTO});
  }

  seeClaimDetails(claimSearchDTO: dtos.ClaimSearchDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/claims/claim-details`;
    return this.httpClient.request<dtos.ResponseDTO>("get", url, {body: claimSearchDTO});
  }

  //membership section --->

  addPatientToMembership(membershipPatientModificationDTO: dtos.MembershipPatientModificationDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/membership/add-patient`;
    return this.httpClient.request<dtos.ResponseDTO>("post", url, { body: membershipPatientModificationDTO }  );
  }

  removePatientFromMembership(membershipPatientModificationDTO: dtos.MembershipPatientModificationDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/membership/remove-patient`;
    return this.httpClient.request<dtos.ResponseDTO>("post", url, { body: membershipPatientModificationDTO }  );
  }

  acquireMembership(membershipAcquirementDTO: dtos.MembershipAcquirementDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/membership/acquire-membership`;
    return this.httpClient.request<dtos.ResponseDTO>("put", url, { body: membershipAcquirementDTO }  );
  }

  resignMembership(patientPersonalId: string): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/membership/resign-membership/${patientPersonalId}`;
    return this.httpClient.request<dtos.ResponseDTO>("post", url);
  }

  makePaymentToMembershipCharge(membershipPaymentDTO: dtos.MembershipPaymentDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/membership/pay-charge`;
    return this.httpClient.request<dtos.ResponseDTO>("post", url, { body: membershipPaymentDTO }  );
  }

  getChargesFromMembership(chargeListDTO: dtos.ChargeListDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/membership/view-charges`;
    return this.httpClient.post<dtos.ResponseDTO>(url, chargeListDTO);
  }  

  getPaymentsFromCharge(paymentListDTO: dtos.PaymentListDTO): Observable<dtos.ResponseDTO> {
    const url = `${this.baseUrl}/membership/view-payments`;
    return this.httpClient.post<dtos.ResponseDTO>(url, paymentListDTO);
  }
}
