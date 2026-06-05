"use strict";

import Citizen from "./class.citizen.js";

export default class NobleCitizen extends Citizen {
    constructor(name) {
        super(name);
        this.rank = 1;
    }

    toString() {
        return `${this.name} (Noble, Rank 1)`;
    }
}