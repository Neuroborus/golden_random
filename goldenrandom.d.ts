import {BigNumber} from 'bignumber.js';

export interface GRProgress {
    ADDEND_A: BigNumber.Value; // current ADDEND_A
    ADDEND_B: BigNumber.Value; // current ADDEND_B
    ACCURACY: number; // DECIMAL_PLACES
}

export interface GRConfig extends GRProgress {
    RETURN_TYPE: 'string' | 'number' | 'BigNumber';
}

declare class GoldenRandom {
    constructor(config?: Partial<GRConfig>);

    next<T = BigNumber.Value>(): T;

    getProgress(): GRProgress;
}

export default GoldenRandom;