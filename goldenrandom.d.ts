import { BigNumber } from 'bignumber.js';

export interface GRProgress {
    DIVIDEND: BigNumber.Value; // current dividend
    DIVISOR: BigNumber.Value; // current divisor
    ACCURACY: number; // DECIMAL_PLACES
}

export interface GRConfig extends GRProgress {}

declare class GoldenRandom {
    constructor(config?: Partial<GRConfig>);

    next(): string;

    getProgress(): GRProgress;
}

export default GoldenRandom;