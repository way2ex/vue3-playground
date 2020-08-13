import createModel from './common/vue-model'

export default createModel({
    state: {
        petName: '',
    },
    actions: {
        initName(state, name) {
            state.petName = name
        },
    },
})
