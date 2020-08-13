import createModel from './common/vue-model'
import usePetModel from './pet-model'

const { state, actions: petActions } = usePetModel()

export default createModel({
    state: {
        name: '',
        age: 18,
        hobbies: [], // [ { name: 'swimming', category: 'sport' } ]
        company: {},
        ...state,
    },
    actions: {
        initName(state, name) {
            state.name = name
            petActions.initName('my pet name')
            return state
        },
        increaseAge(state, count = 1) {
            state.age += count
            return state
        },
        addHobby(state, hobby) {
            state.hobbies.push(hobby)
        },
        changeHobbyName(state, index, name) {
            if (state.hobbies[index]) {
                state.hobbies[index].name = name
            }
        },
        addCompanyInfo(state, info) {
            state.company = info
        },
        changeCompanyName(state, name) {
            state.company.name = name
        },
        addExtraInfo(state, info) {
            state.extraInfo = info
        },
        changeExtraInfoName(state, name) {
            state.extraInfo.name = name
        },
    },
})
