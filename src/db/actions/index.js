export const CREATE_ACT_TRACKER = 'CREATE_ACT_TRACKER';

export const createActTracker = (actTracker) => {
    return ({
        type : CREATE_ACT_TRACKER,
    actTracker : actTracker
});
}
