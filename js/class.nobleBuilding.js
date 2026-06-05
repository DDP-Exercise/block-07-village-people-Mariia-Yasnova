"use strict";

import Building from "./class.building.js";

export default class NobleBuilding extends Building {
    constructor(name, capacity) {
        super(name, capacity);
    }

    addResident(citizen) {
        // only nobles allowed (rank 1)
        if (citizen.rank !== 1) return false;

        return super.addResident(citizen);
    }
}