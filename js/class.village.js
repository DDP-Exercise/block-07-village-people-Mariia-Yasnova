"use strict";

import Citizen from "./class.citizen.js";
import NobleCitizen from "./class.nobleCitizen.js";
import Building from "./class.building.js";
import NobleBuilding from "./class.nobleBuilding.js";

export default class Village {
    constructor(name) {
        this.name = name;
        this.buildings = [];
        this.citizens = [];
    }

    addBuilding(name, capacity, noblesOnly = false) {
        const building = noblesOnly
            ? new NobleBuilding(name, capacity)
            : new Building(name, capacity);

        this.buildings.push(building);
    }

    addCitizen(name, isNoble = false) {
        const citizen = isNoble
            ? new NobleCitizen(name)
            : new Citizen(name);

        this.citizens.push(citizen);

        // try assign to a building
        for (const building of this.buildings) {
            if (building.addResident(citizen)) {
                break;
            }
        }
    }

    shelterTheWorthy() {
        // try to reassign homeless citizens
        const homeless = this.citizens.filter(c => c.home === null);

        for (const citizen of homeless) {
            for (const building of this.buildings) {
                if (building.addResident(citizen)) {
                    break;
                }
            }
        }
    }

    printCitizenDirectory() {
        console.log(`%c===== Citizen Directory of ${this.name} =====`,
            "background: green; color: white; padding: 4px 10px; font-weight: bold;");

        for (const building of this.buildings) {
            console.log(`%c ${building.name} (Capacity: ${building.capacity})`,
                "background: orange; color: white; padding: 4px 10px; font-weight: bold;");

            const residents = building.listAllResidents();
            if (residents.length === 0) {
                console.log("  (empty)");
            } else {
                for (const r of residents) {
                    console.log("  - " + r.toString());
                }
            }

            console.log("");
        }

        const homeless = this.citizens.filter(c => c.home === null);

        if (homeless.length > 0) {
            console.log(" Homeless Citizens:");
            for (const c of homeless) {
                console.log("  - " + c.toString());
            }
        }
    }
}