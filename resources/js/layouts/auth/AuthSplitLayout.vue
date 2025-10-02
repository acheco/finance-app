<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';
import { Link, usePage } from '@inertiajs/vue3';

const page = usePage();
const name = page.props.name;
const quote = page.props.quote;

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <header
        class="rounded-b-xl bg-grey-900 py-4 text-center text-2xl font-bold text-white lg:hidden"
    >
        Finance
    </header>
    <div
        class="relative grid h-dvh flex-col items-center justify-center sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0"
    >
        <div
            class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
        >
            <div class="absolute inset-0 bg-zinc-900" />
            <Link
                :href="home()"
                class="relative z-20 flex items-center text-lg font-medium"
            >
                {{ name }}
            </Link>
            <div class="relative z-20 flex items-center mt-auto">
                <AppLogoIcon class="mr-2 size-8 fill-current text-white" />

            </div>
            <div v-if="quote" class="relative z-20 mt-auto">
                <blockquote class="space-y-1">
                    <p class="text-2xl font-bold">Keep track of your money</p>
                    <p class="text-2xl font-bold">and save for your future</p>
                    <footer class="text-sm text-neutral-300">
                        <p>
                            Personal finance app puts you in control of your
                            spending. track
                        </p>
                        <p>
                            transactions, set budgets and add to savings pots
                            easily.
                        </p>
                    </footer>
                </blockquote>
            </div>
        </div>
        <div class="lg:p-8">
            <div
                class="mx-auto flex w-full flex-col justify-center space-y-6 rounded-xl bg-white p-4 sm:w-[350px] md:w-[450px] md:p-10"
            >
                <div class="flex flex-col space-y-2 text-center">
                    <h1 class="text-xl font-medium tracking-tight" v-if="title">
                        {{ title }}
                    </h1>
                    <p class="text-sm text-muted-foreground" v-if="description">
                        {{ description }}
                    </p>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
