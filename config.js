module.exports = {
    BN_MODULO_MOD: 1,
    defaultConfig: () => {
        return {
            DIVIDEND: Math.random(),
            DIVISOR: Math.random(),
            ACCURACY: 20
        }
    }
};