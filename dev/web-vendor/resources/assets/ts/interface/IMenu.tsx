import { IFood } from './IFood';
import { IDrink } from './IDrink';

export interface IMenu {
    id: number;
    name: string;
    foods: IFood[];
    drinks: IDrink[];
}
​
