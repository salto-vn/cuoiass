import { IMenu } from '../interface/IMenu';

export class MenuModel implements IMenu {
   public menu_id: number = 0;
   public menu_name: string = "";
   public unit_price: number = 0;
   public food_id: number = 0;
   public food_name: string  = "";
   public image_ids: string  = "";
   public food_images: string[] = [];
}