import Personne from "./Personne";

export default class ListePersonnes {

    constructor(){
        this.personnes = [
            new Personne(0, "Jacque", "Dutronc", "Jacky", new Date(1960, 1, 12)),
            new Personne(0, "Michel", "Dupont", "Michmich", new Date(1972, 10, 21)),
            new Personne(0, "Edouard", "Dupuys", "Doudou", new Date(1985, 8, 30)),
            new Personne(0, "Carla", "Dupuys", "Carlou", new Date(1985, 8, 30))
        ];
    }

}