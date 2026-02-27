export const UP = 1;
export const DOWN = 2;
export const DIRECT = 3;
export const UP_DIRECT = 4;
export const DOWN_DIRECT = 5;
export const VIA_CITY_LOOP = 6;
export const UP_VIA_CITY_LOOP = 7;
export const DOWN_VIA_CITY_LOOP = 8;
export const VIA_METRO_TUNNEL = 9;
export const UP_VIA_METRO_TUNNEL = 10;
export const DOWN_VIA_METRO_TUNNEL = 11;
export const COMMON = 12;
export const COMMON_UP = 13;
export const COMMON_DOWN = 14;
export const ALBURY_BRANCH = 15;
export const ALBURY_BRANCH_UP = 16;
export const ALBURY_BRANCH_DOWN = 17;
export const SHEPPARTON_BRANCH = 18;
export const SHEPPARTON_BRANCH_UP = 19;
export const SHEPPARTON_BRANCH_DOWN = 20;
export const ECHUCA_BRANCH = 21;
export const ECHUCA_BRANCH_UP = 22;
export const ECHUCA_BRANCH_DOWN = 23;
export const SWAN_HILL_BRANCH = 24;
export const SWAN_HILL_BRANCH_UP = 25;
export const SWAN_HILL_BRANCH_DOWN = 26;
export const MARYBOROUGH_BRANCH = 27;
export const MARYBOROUGH_BRANCH_UP = 28;
export const MARYBOROUGH_BRANCH_DOWN = 29;
export const ARARAT_BRANCH = 30;
export const ARARAT_BRANCH_UP = 31;
export const ARARAT_BRANCH_DOWN = 32;

// [NOTE] These look the same as the route IDs, but serve a different purpose.
// [NOTE] Each route can only have one ID, but can have multiple tags (e.g.
// [NOTE] routes with IDs of UP, UP_DIRECT, UP_VIA_CITY_LOOP,
// [NOTE] UP_VIA_METRO_TUNNEL, ALBURY_BRANCH_UP, etc. will have those tags too,
// [NOTE] but they'll also be taggedwith UP so that stop pages can group all
// [NOTE] services going in the up direction, regardless of the exact route ID).
