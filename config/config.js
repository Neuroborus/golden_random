const {RETURN_TYPE} = require("../types/types");

module.exports = {
    BN_MODULO_MOD: 1,
    defaultConfig: () => {
        return {
            ADDEND_A: Math.random(),
            ADDEND_B: Math.random(),
            ACCURACY: 20,
            RETURN_TYPE: RETURN_TYPE.STRING,
        }
    }
};