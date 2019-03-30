const logger = store => next => action => {
    console.group("LOGGER");
    console.log("Store before Action - Action:", action.type);
    console.log(store.getState());
    const returnValue = next(action);
    console.log("Store AFTER Action - Action:", action.type);
    console.log(store.getState());
    console.groupEnd();
    return returnValue;
};

export default logger;
