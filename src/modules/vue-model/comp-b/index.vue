<template>
    <h1>Comp B</h1>
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
        <div>
            <button @click="addExtraInfo">
                Add extra info
            </button>
            <button @click="changeExtraInfoName">
                change  extra info name
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import useModel from '../model'
import { shuffle } from 'lodash'

const hobbies = [
    { name: 'basketball', type: 'sport' },
    { name: 'footerball', type: 'sport' },
    { name: 'painting', type: 'talent' },
    { name: 'singing', type: 'talent' },
]

export default {
    name: 'CompB',
    components: {
    },
    props: {
    },
    setup(){
        const { state, actions } = useModel()

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

        const addExtraInfo = () => {
            actions.addExtraInfo({ name: 'ExtraInfo' })
        }
        const changeExtraInfoName = () => {
            const name = state.extraInfo.name || 'ExtraInfo'
            actions.changeExtraInfoName(shuffle(name.split('')).join(''))
        }
        return {
            state,
            actions,

            addHobby,
            changeHobbyName,
            addCompanyInfo,
            changeCompanyName,

            addExtraInfo,
            changeExtraInfoName,
        }
    },
}
</script>
<style scoped>
span:first-child {
    margin-right: 20px;
}
</style>
