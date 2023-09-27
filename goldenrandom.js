const BigNumber = require("bignumber.js");
const { BN_MODULO_MOD, defaultConfig } = require ("./config");

class GoldenRandom {
    BigNumber;

    ADDEND_A;
    ADDEND_B;
    ACCURACY;
    GOLDEN_RATIO;

    constructor ( config = {} ) {
        const finalConfig = { ...defaultConfig(), ...config };
        this.BigNumber = BigNumber.clone({
            DECIMAL_PLACES: finalConfig.ACCURACY,
            MODULO_MODE: BN_MODULO_MOD
        });

        this.ADDEND_A = new this.BigNumber(finalConfig.ADDEND_A);
        this.ADDEND_B = new this.BigNumber(finalConfig.ADDEND_B);
        this.ACCURACY = finalConfig.ACCURACY;

        // Golden Ratio with configured decimals { (1 + sqrt(5)) / 2 }
        this.GOLDEN_RATIO = new this.BigNumber(5).sqrt()
            .plus(1)
            .dividedBy(2);
    }

    next() {
        /// next() is a function that returns a random number
        let {ADDEND_A, ADDEND_B} = this;
        const next = ADDEND_A.plus(ADDEND_B).dividedBy(this.GOLDEN_RATIO);
        this.ADDEND_A = ADDEND_B;
        this.ADDEND_B = next;

        const fixed = next.toFixed(this.ACCURACY);
        return fixed.slice(fixed.indexOf('.') + 1);
    }

    getProgress() {
        /// getProgress() is a function that returns the current state of the generator
        return {
            ADDEND_A: this.ADDEND_A.toFixed(),
            ADDEND_B: this.ADDEND_B.toFixed(),
            ACCURACY: this.ACCURACY,
        };
    }
}

module.exports = GoldenRandom;