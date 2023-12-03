import { TypeParticipation } from "./enums/type-participation";
import { Etudiant } from "./etudiant";
import { Evenement } from "./evenement";
export class Participation {
    idParticipation!:number;
    dateParticipation!:Date;
    typeP!: TypeParticipation;
    raisonDeParticipation!:String;
    etudiant!: Etudiant;
    evenement!: Evenement;
}