import {BigNumber} from 'bignumber.js';

export interface GRProgress {
    ADDEND_A: BigNumber.Value; // current ADDEND_A
    ADDEND_B: BigNumber.Value; // current ADDEND_B
    ACCURACY: number; // DECIMAL_PLACES
}

export interface GRConfig extends GRProgress {
}

declare class GoldenRandom {
    constructor(config?: Partial<GRConfig>);

    next(): string;

    getProgress(): GRProgress;
}

export default GoldenRandom;