/**
 * compare the doc against query criterias
 * @param {object} doc
 * @param {object} query
 * @returns {boolean}
 */
export function compare(doc = {}, query = {}) {
    const operators = {
        $gte: (value, check) => value >= check
    };

    const compareValues = (docValue, queryValue) => {
        if (typeof queryValue === 'object' && !Array.isArray(queryValue)) {
            for (const key in queryValue) {
                if (operators[key]) {
                    return operators[key](docValue, queryValue[key]);
                }
            }
        } else {
            return docValue === queryValue;
        }
    };

    const compareObjects = (doc, query) => {
        for (const key in query) {
            if (key === '$or') {
                return query[key].some((q) => compareObjects(doc, q));
            }

            const keys = key.split('.');
            let value = doc;
            
            for (const k of keys) {
                value = value?.[k];
            }

            if (!compareValues(value, query[key])) {
                return false;
            }
        }
        return true;
    };

    return compareObjects(doc, query);
}
