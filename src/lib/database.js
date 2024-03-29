import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://db.izmm.uk');
pb.autoCancellation(false);
export const auth = writable(pb.authStore.model);
pb.authStore.onChange(() => {
    auth.set(pb.authStore.model);
});

if (pb.authStore.model?.username) {
    try {
        pb.collection('users').authRefresh();
    } catch (err) {
        console.log(err);
    }
};
