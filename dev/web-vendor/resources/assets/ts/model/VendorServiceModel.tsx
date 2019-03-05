import { IVendorService } from '../interface/IVendorService';

export class VendorServiceModel implements IVendorService {
   public vendor_id: number = 0;
   public service_code: string = "";
   public ven_serv_name: string = "";
   public add_service: string = "";
   public city: string = "";
   public phone_service: string = "";
   public fax_service:string = "";
}