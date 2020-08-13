import { reactive, onUnmounted, readonly } from 'vue'

const createActions = (state: any, actions: any) => {
    return Object.keys(actions).reduce((acc, key) => {
        acc[key] = (...params) => {
            return actions[key](state, ...params)
        }
        return acc
    }, {})
}
let i = 0
/**
 * 创建一个 model
 * @param model model 配置
 */
const createModel = model => {
    i++

    let refCount = 0
    let state = null
    let actions = null

    Object.defineProperty(window, 'state' + i, {
        get() { return state },
    })
    Object.defineProperty(window, 'refCount' + i, {
        get() { return refCount },
    })
    return function() {
        if (refCount < 1) {
            state = reactive(model.state)
            actions = createActions(state, model.actions)
        }
        refCount++

        onUnmounted(() => {
            refCount--
            if (refCount < 1) {
                state = null
                actions= null
                refCount = 0
            }
        })
        return { state: readonly(state), actions: actions }
    }
}

export default createModel
