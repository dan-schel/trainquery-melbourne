// TODO: Merge regional lines like Echuca/Swan Hill/Bendigo together into a
// single line. Also merge in the suburban lines they share track with, but
// mark those stops as the "hidden-unless-stopped-at" type.
//
// This should have the side effect of fixing the bendigo line not realising
// patterns which stop at Watergardens and not Sunbury and vice-versa can be
// merged.
//
// I imagine this will make use of the consolidateStoppingPatterns and
// namePatterns functions of find-routes-for-line.ts. They'll need to be
// exported & maybe moved to their own files.
