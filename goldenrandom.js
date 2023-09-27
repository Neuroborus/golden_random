const { BN_MODULO_MOD, defaultConfig } = require ("./config");

class GoldenRandom {
    BigNumber = require("bignumber.js");

    DIVIDEND;
    DIVISOR;
    ACCURACY;
    GOLDEN_RATIO;

    constructor ( config = {} ) {
        const finalConfig = { ...defaultConfig(), ...config };
        this.BigNumber.config({
            DECIMAL_PLACES: finalConfig.ACCURACY,
            MODULO_MODE: BN_MODULO_MOD
        });

        this.DIVIDEND = new this.BigNumber(finalConfig.DIVIDEND);
        this.DIVISOR = new this.BigNumber(finalConfig.DIVISOR);
        this.ACCURACY = finalConfig.ACCURACY;

        // Golden Ratio with configured decimals { (1 + sqrt(5)) / 2 }
        this.GOLDEN_RATIO = new this.BigNumber(5).sqrt()
            .plus(1)
            .dividedBy(2);
    }

    next() {
        let {DIVIDEND, DIVISOR} = this;
        const next = DIVIDEND.plus(DIVISOR).dividedBy(this.GOLDEN_RATIO);
        this.DIVIDEND = DIVISOR;
        this.DIVISOR = next;

        const fixed = next.toFixed();
        return fixed.slice(fixed.indexOf('.') + 1);
    }

    getProgress() {
        return {
            DIVIDEND: this.DIVIDEND.toFixed(),
            DIVISOR: this.DIVISOR.toFixed(),
            ACCURACY: this.ACCURACY,
        };
    }
}

module.exports = GoldenRandom;