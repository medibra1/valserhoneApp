import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Company, Contact, Devis, Portofolio, Service, Slider, Testimonial } from '../models/slider';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public company!: Company;
  public companySubj = new Subject<Company>();

  constructor(private http: HttpClient) {
    this.getCompanyInfo();
   }

  getSliders(): Observable<Slider[]> {
    const url = `${environment.api_url}/sliders`;
    return this.http.get<Slider[]>(url).pipe(
      tap(res => res)
    )
  }

  getServices(): Observable<Service[]> {
    const url = `${environment.api_url}/services`;
    return this.http.get<Service[]>(url);
  }

  emitCompany(): void {
    this.companySubj.next(this.company);
  }
  getCompanyInfo(): void{
    const url = `${environment.api_url}/infos`;
     this.http.get<Company>(url).subscribe({
      next: (res: Company)=>{
        this.company = res;
        this.emitCompany();
      },
      error: err=>{console.log(err)}
    })
  }

  getTestimo(): Observable<Testimonial[]>{
    const url = `${environment.api_url}/testimo`;
     return this.http.get<Testimonial[]>(url).pipe(
      tap(res => res)
    )
  }

  getPortofolio(): Observable<Portofolio[]> {
    const url = `${environment.api_url}/portofolio`; 
    return this.http.get<Portofolio[]>(url);
  }

  sendContactMail(contact: Contact): Observable<Contact> {
    const url = `${environment.api_url}/send_contact`;
    let params = new FormData();
    params.append('nom', contact.nom);
    params.append('email', contact.email);
    params.append('objet', contact.objet);
    params.append('message', contact.message);
    return this.http.post<Contact>(url, params);
  }

  sendDevisMail(devis: Devis): Observable<Devis> {
    const url = `${environment.api_url}/send_devis`;
    let params = new FormData();
    params.append('nom', devis.nom);
    params.append('email', devis.email);
    params.append('adresse', devis.adresse!);
    params.append('telephone', devis.telephone!);
    params.append('dim_interieur', devis.dim_interieur!);
    params.append('dim_exterieur', devis.dim_exterieur!);
    params.append('dim_plafond', devis.dim_plafond!);
    params.append('dim_sol_interieur', devis.dim_sol_interieur!);
    params.append('dim_sol_exterieur', devis.dim_sol_exterieur!);
    params.append('service_interieur', devis.service_interieur!);
    params.append('service_exterieur', devis.service_exterieur!);
    params.append('service_plafond', devis.service_plafond!);
    params.append('service_sol_interieur', devis.service_sol_interieur!);
    params.append('service_sol_exterieur', devis.service_sol_exterieur!);
    params.append('description', devis.description!);
    params.append('divers_libelle', devis.divers_libelle!);
    params.append('divers_dim', devis.divers_dim!);
    params.append('date', devis.date!);
    params.append('heure1', devis.heure1!);
    params.append('heure2', devis.heure2!);
    return this.http.post<Devis>(url, params);
  }

}
