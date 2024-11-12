import { Album } from "./album.model";
import { Image } from "./image.model";

export class Chanson {
    idChanson? : number;
    titreChanson? : String
    dureeChanson? :number;
    album! :Album
    image! : Image
    imageStr!:string
    images!: Image[]
}