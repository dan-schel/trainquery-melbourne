export const UP = 1;
export const DOWN = 2;
export const UP_DIRECT = 3;
export const DOWN_DIRECT = 4;
export const UP_VIA_CITY_LOOP = 5;
export const DOWN_VIA_CITY_LOOP = 6;
export const UP_VIA_METRO_TUNNEL = 7;
export const DOWN_VIA_METRO_TUNNEL = 8;
export const ALBURY_BRANCH_UP = 9;
export const ALBURY_BRANCH_DOWN = 10;
export const SHEPPARTON_BRANCH_UP = 11;
export const SHEPPARTON_BRANCH_DOWN = 12;
export const ECHUCA_BRANCH_UP = 13;
export const ECHUCA_BRANCH_DOWN = 14;
export const SWAN_HILL_BRANCH_UP = 15;
export const SWAN_HILL_BRANCH_DOWN = 16;
export const MARYBOROUGH_BRANCH_UP = 17;
export const MARYBOROUGH_BRANCH_DOWN = 18;
export const ARARAT_BRANCH_UP = 19;
export const ARARAT_BRANCH_DOWN = 20;

// These look the same as the route IDs, but serve a different purpose.
// Each route can only have one ID, but can have multiple tags (e.g. routes with
// IDs of UP, UP_DIRECT, UP_VIA_CITY_LOOP, UP_VIA_METRO_TUNNEL,
// ALBURY_BRANCH_UP, etc. will have those tags too, but they'll also be tagged
// with UP so that stop pages can group all services going in the up direction,
// regardless of the exact route ID).
