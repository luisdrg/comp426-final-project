
export class Ingredient {

    #id
    #name

    static #next_id = 1;
    static #all_ingredients = [];

    constructor (id, name) {
        this.#id = id;
        this.#name = name;
    }

    static create(data) {
        if ((data !== undefined) && (data instanceof Object) 
        && (data.name !== undefined) 
        && (typeof data.name == 'string')) {
            let id = Ingredient.#next_id++;

            let ing = new Ingredient(id, data.name);
            Ingredient.#all_ingredients.push(ing);
            return ing;
        }
        return null;
    }

    static getAllIDs() {
        return Ingredient.#all_ingredients.map((ing) => ing.getID());
    }

    static findByID(id) {
        return Ingredient.#all_ingredients.find((ing) => {
            return ing.getID() == id;
        });
    }

    static deleteIngredientByID(id) {
        Ingredient.#all_ingredients = Ingredient.#all_ingredients.filter((i) => i.getID() !== id);
    }

    json() {
        return {
            id: this.#id,
            name: this.#name
        }
    }

    getID() {
        return this.#id;
    }

    setName(new_name) {
        this.#name = new_name;
    }
}
