<template>
    <h1>Comp A</h1>
    <div>
        <div>
            <span>Name: {{ state.name }}</span>
            <span>Age: {{ state.age }}</span>
        </div>
        <div>
            <button @click="actions.initName('John')">
                Init name
            </button>
            <button @click="actions.increaseAge(1)">
                Increase age
            </button>
        </div>
        <div
            v-for="hobby of state.hobbies"
            :key="hobby.name"
        >
            <span>Hobby name: {{ hobby.name }}</span>
            <span>Hobby type: {{ hobby.type }}</span>
        </div>
        <div>
            <button @click="addHobby">
                Add hobby
            </button>
            <button @click="changeHobbyName">
                changeHobbyName
            </button>
        </div>
        <div>
            <span>Company name: {{ state.company.name }}</span>
            <span>Company address: {{ state.company.address }}</span>
        </div>
        <div>
            <button @click="addCompanyInfo">
                Add company info
            </button>
            <button @click="changeCompanyName">
                changeCompanyName
            </button>
        </div>
        <div>
            {{ state.extraInfo && state.extraInfo.name || 'No extra info' }}
        </div>
        <button @click="changeState">
            change state directly
        </button>
        <h2>Test multi model</h2>
        <span>{{ petState.petName }}</span>
    </div>
</template>
<script lang="ts">
import useModel from '../model'
import usePetModel from '../pet-model'
import { shuffle } from 'lodash'

const hobbies = [
    { name: 'basketball', type: 'sport' },
    { name: 'footerball', type: 'sport' },
    { name: 'painting', type: 'talent' },
    { name: 'singing', type: 'talent' },
]

export default {
    name: 'CompA',
    components: {
    },
    props: {
    },
    setup(){
        const { state, actions } = useModel()
        const { state: petState } = usePetModel()

        const addHobby = () => {
            actions.addHobby(hobbies[Math.floor(Math.random() * hobbies.length)])
        }
        const changeHobbyName = () => {
            const name = state.hobbies[2].name
            actions.changeHobbyName(2, shuffle(name.split('')).join(''))
        }
        const addCompanyInfo = () => {
            actions.addCompanyInfo({ name: 'WUDI', address: 'somewhere' })
        }
        const changeCompanyName = () => {
            const name = state.company.name || 'GOOGLE'
            actions.changeCompanyName(shuffle(name.split('')).join(''))
        }

        const changeState = () => {
            state.name = 'new name'
            state.age++
        }
        return {
            state,
            actions,

            petState,

            addHobby,
            changeHobbyName,
            addCompanyInfo,
            changeCompanyName,

            changeState,
        }
    },
}
</script>
<style scoped>
span:first-child {
    margin-right: 20px;
}
</style>
