const BigNumber = require('bignumber.js');
const {RETURN_TYPE} = require('./types/types');
const {BN_MODULO_MOD, defaultConfig} = require('./config/config');

class GoldenRandom {
    #BigNumber;

    #ADDEND_A;
    #ADDEND_B;
    #ACCURACY;
    #GOLDEN_RATIO;

    #RETURN_TYPE;

    constructor(config = {}) {
        const finalConfig = {...defaultConfig(), ...config};

        if (Object.values(RETURN_TYPE).find(type => type === finalConfig.RETURN_TYPE) === undefined) {
            throw new Error(`Invalid RETURN_TYPE: ${finalConfig.RETURN_TYPE}\n` +
                `Valid types: ${Object.values(RETURN_TYPE).join(', ')}`
            );
        }

        this.#BigNumber = BigNumber.clone({
            DECIMAL_PLACES: finalConfig.ACCURACY,
            MODULO_MODE: BN_MODULO_MOD
        });

        this.#ADDEND_A = new this.#BigNumber(finalConfig.ADDEND_A);
        this.#ADDEND_B = new this.#BigNumber(finalConfig.ADDEND_B);
        this.#ACCURACY = finalConfig.ACCURACY;
        this.#RETURN_TYPE = finalConfig.RETURN_TYPE;

        // Golden Ratio with configured decimals { (1 + sqrt(5)) / 2 }
        this.#GOLDEN_RATIO = new this.#BigNumber(5).sqrt()
            .plus(1)
            .dividedBy(2);
    }

    next() {
        /// next() is a function that returns a random number
        const next = this.#ADDEND_A.plus(this.#ADDEND_B).dividedBy(this.#GOLDEN_RATIO);
        this.#ADDEND_A = this.#ADDEND_B;
        this.#ADDEND_B = next;

        const fixed = next.toFixed(this.#ACCURACY);
        const str = fixed.slice(fixed.indexOf('.') + 1);

        switch (this.#RETURN_TYPE) {
            case RETURN_TYPE.STRING:
                return str;
            case RETURN_TYPE.NUMBER:
                return Number(str);
            case RETURN_TYPE.BIG_NUMBER:
                return new BigNumber(str);

            default:
                throw new Error(`Invalid RETURN_TYPE: ${this.#RETURN_TYPE}`);
        }

    }

    getProgress() {
        /// getProgress() is a function that returns the current state of the generator
        return {
            ADDEND_A: this.#ADDEND_A.toFixed(),
            ADDEND_B: this.#ADDEND_B.toFixed(),
            ACCURACY: this.#ACCURACY,
        };
    }
}

module.exports = GoldenRandom;