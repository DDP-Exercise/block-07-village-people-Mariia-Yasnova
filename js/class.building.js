"use strict";

export default class Building {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.residents = [];
    }

    addResident(citizen) {
        if (this.residents.length < this.capacity) {
            this.residents.push(citizen);
            citizen.home = this;
            return true;
        }

        return this.makeSpaceFor(citizen);
    }

    makeSpaceFor(citizen) {
        // find lowest-ranked resident that is weaker than incoming citizen
        let weakestIndex = -1;
        let weakestRank = citizen.rank;

        for (let i = 0; i < this.residents.length; i++) {
            const r = this.residents[i];
            if (r.rank > weakestRank) {
                weakestRank = r.rank;
                weakestIndex = i;
            }
        }

        if (weakestIndex !== -1) {
            const kicked = this.residents[weakestIndex];
            this.removeResident(kicked);

            this.residents.push(citizen);
            citizen.home = this;
            return true;
        }

        return false;
    }

    removeResident(citizen) {
        const index = this.residents.indexOf(citizen);
        if (index !== -1) {
            this.residents.splice(index, 1);
            citizen.home = null;
        }
    }

    listAllResidents() {
        return this.residents;
    }
}