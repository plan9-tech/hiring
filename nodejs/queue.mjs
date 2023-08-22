/**
 * queue receives the stack of async tasks and executes it in a sync manner
 * @param {Array} stack of tasks
 * @returns {Array} results of queued tasks
 */
export async function queue(stack = []) {
    let results = [];

    for (let i = 0; i < stack.length; i++) {
        let result = await stack[i]();
        results.push(result);
    }

    return results;
}
