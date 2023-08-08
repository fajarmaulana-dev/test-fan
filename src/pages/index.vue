<script setup lang="ts">
import Api from '@/api/api';
import { ref, reactive } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = ref(route.query.name as string)

watch(route, () => {
    id.value = route.query.name as string
    if (id.value) poke.value = data.value.find((i: any) => i.name == id.value)
})

const data: any = ref([])
const getData = async () => {
    try {
        const res = await Api.get(`/`)
        for (const i in res.data.results) {
            const res1: any = await Api.get(`/${Number(i) + 1}`)
            const extract = {
                name: res1.data.name,
                image: res1.data.sprites.front_default ? res1.data.sprites.front_default : res1.data.sprites.front_shiny ? res1.data.sprites.front_shiny : '',
                abilities: res1.data.abilities,
                height: res1.data.height,
                species: res1.data.species.name,
                stats: res1.data.stats
            }
            data.value.push(extract)
        }
    } catch (err: any) {
        console.log(err)
    }
}
const poke: any = ref()
onMounted(async () => {
    await getData()
    console.log(data.value.map((i: any) => i.name))
    poke.value = data.value.find((i: any) => i.name == id.value)
    console.log(typeof poke.value)
})
</script>

<template>
    <div class="p-[calc(1rem+2vw)]">
        <h1 class="text-center text-3xl font-black text-sky-700 mb-12">
            {{ id ? 'Detail Pokemon' : 'Daftar Jenis Pokemon' }}
        </h1>
        <div v-if="!id">
            <div class="flex flex-wrap justify-center gap-8">
                <div v-for="d, i in data" :key="i"
                    class="bg-white p-4 w-[12rem] flex flex-col justify-between items-center h-[14rem] shadow-[0_0_4px_1px] shadow-sky-300 rounded-2xl">
                    <div class="grid place-items-center">
                        <img v-if="d.image.length > 0" class="w-[9rem]" height="240" :src="d.image"
                            :alt="`pokemon-image`" />
                        <p v-else>image not found</p>
                    </div>
                    <button @click="router.push(`/?name=${d.name}`)"
                        class="h-10 w-full [transition:.4s] text-white rounded-md font-bold bg-sky-600 hover:bg-sky-700 active:bg-sky-600 ring-sky-300 focus:ring-[3px] focus::ring-opacity-50 focus::ring-inset">Lihat
                        Detail</button>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="bg-white min-h-[50vh] p-8 shadow-[0_0_4px_1px] shadow-sky-300 rounded-2xl">
                <div @click="router.replace('/')"
                    class="flex items-center w-fit gap-3 text-sm font-bold text-sky-600 hover:text-sky-700 active:text-sky-600 [transition:.4s] cursor-pointer">
                    <i class="fas fa-arrow-left"></i>
                    <p>Kembali</p>
                </div>
                <div v-if="poke?.name.length > 0">
                    <div class="flex flex-col md:flex-row gap-8 items-center">
                        <div>
                            <img v-if="poke?.image.length > 0" class="min-w-[12rem]" height="240" :src="poke?.image"
                                :alt="`pokemon-image`" />
                            <p v-else>image not found</p>
                        </div>
                        <div
                            class="flex flex-wrap gap-x-12 gap-y-6 [&>*]:flex [&>*]:flex-col sm:[&>*]:flex-row [&>*]:gap-3 sm:[&>*]:items-center [&>div>div]:flex [&>div>div]:gap-2 [&>div>div]:items-center [&>div>div]:py-0.5 [&>div>div]:px-3 [&>div>div]:bg-gradient-to-r [&>div>div]:from-sky-700 [&>div>div]:via-teal-500 [&>div>div]:to-transparent [&>div>div]:w-[8.5rem] [&>div>div]:rounded [&>div>div]:text-white [&>div>div]:font-bold">
                            <div>
                                <div>
                                    <i class="fas fa-staff-snake"></i>
                                    <h3>Name</h3>
                                </div>
                                <p class="text-sky-700 font-bold">{{ poke?.name }}</p>
                            </div>
                            <div>
                                <div>
                                    <i class="fas fa-bolt"></i>
                                    <h3>Abilities</h3>
                                </div>
                                <p class="text-sky-700 font-bold flex flex-col xs:flex-row gap-y-2 gap-x-5">
                                    <span v-for="a, j in poke?.abilities" :key="j">
                                        {{ a.ability.name }}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <div>
                                    <i class="fas fa-arrows-left-right rotate-90"></i>
                                    <h3>Height</h3>
                                </div>
                                <p class="text-sky-700 font-bold">{{ poke?.height }}</p>
                            </div>
                            <div>
                                <div>
                                    <i class="fa-solid fa-dice-d20"></i>
                                    <h3>Species</h3>
                                </div>
                                <p class="text-sky-700 font-bold">{{ poke?.species }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3 mt-6">
                        <div
                            class="flex gap-2 items-center py-0.5 px-3 bg-gradient-to-r from-sky-700 via-teal-500 to-transparent w-[8.5rem] rounded text-white font-bold">
                            <i class="fa-solid fa-dice-d20"></i>
                            <h3>Stats</h3>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                            <div v-for="s, k in poke?.stats" :key="k" class="font-bold">
                                <p class="mb-2 text-rose-700 font-black">{{ s?.stat?.name.toUpperCase().replace('-', ' ') }}
                                </p>
                                <p class="mb-0.5 text-sky-700">Base Stat</p>
                                <p class="h-2 rounded-full bg-sky-600" :style="`width: ${s?.base_stat * 0.6}%`"></p>
                                <p class="mt-2 mb-0.5 text-teal-700">Effort</p>
                                <p class="h-2 rounded-full bg-teal-600" :style="`width: ${(s?.effort * 15) + 15}%`"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else
                    class="text-center font-bold text-2xl h-[calc(50vh-2rem)] grid place-items-center text-yellow-700">
                    Jenis Pokemon Ini Tidak Tersedia<br />
                </div>
            </div>
        </div>
    </div>
</template>