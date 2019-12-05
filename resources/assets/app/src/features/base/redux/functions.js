/**
 * Sets a specific property of a specific state to a specific value. Prevents
 * unnecessary state changes (when the specified {@code value} is equal to the
 * value of the specified {@code property} of the specified {@code state}).
 *
 * @param {Object} state - The (Redux) state from which a new state is to be
 * constructed by setting the specified {@code property} to the specified
 * {@code value}.
 * @param {string} property - The property of {@code state} which is to be
 * assigned the specified {@code value} (in the new state).
 * @param {*} value - The value to assign to the specified {@code property}.
 * @returns {Object} The specified {@code state} if the value of the specified
 * {@code property} equals the specified <tt>value/tt>; otherwise, a new state
 * constructed from the specified {@code state} by setting the specified
 * {@code property} to the specified {@code value}.
 */
export function set(state: Object, property: string, value: any) {
    return _set(state, property, value, /* copyOnWrite */ true);
}

/* eslint-disable max-params */

/**
 * Sets a specific property of a specific state to a specific value. Prevents
 * unnecessary state changes (when the specified {@code value} is equal to the
 * value of the specified {@code property} of the specified {@code state}).
 *
 * @param {Object} state - The (Redux) state from which a state is to be
 * constructed by setting the specified {@code property} to the specified
 * {@code value}.
 * @param {string} property - The property of {@code state} which is to be
 * assigned the specified {@code value}.
 * @param {*} value - The value to assign to the specified {@code property}.
 * @param {boolean} copyOnWrite - If the specified {@code state} is to not be
 * modified, {@code true}; otherwise, {@code false}.
 * @returns {Object} The specified {@code state} if the value of the specified
 * {@code property} equals the specified <tt>value/tt> or {@code copyOnWrite}
 * is truthy; otherwise, a new state constructed from the specified
 * {@code state} by setting the specified {@code property} to the specified
 * {@code value}.
 */
function _set(
        state: Object,
        property: string,
        value: any,
        copyOnWrite: boolean) {
    // Delete state properties that are to be set to undefined. (It is a matter
    // of personal preference, mostly.)
    if (typeof value === 'undefined'
            && Object.prototype.hasOwnProperty.call(state, property)) {
        const newState = copyOnWrite ? { ...state } : state;

        if (delete newState[property]) {
            return newState;
        }
    }

    if (state[property] !== value) {
        if (copyOnWrite) {
            return {
                ...state,
                [property]: value
            };
        }

        state[property] = value;
    }

    return state;
}