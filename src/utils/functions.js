async function statePreFetch(fn) {
    return new Promise(async (r) => {
        if (this.isLoading || this.isLoaded) {
            r();
            return;
        }

        this.isLoading = true;
            const promise = fn instanceof Promise ? await fn : await fn();
            this.data = promise;

            await setTimeout(() => {
                this.isLoaded = true;
                this.isLoading = false;
                r();
            return;

            }, 300);


        await setTimeout(() => {
            this.isLoading = false;
            r();
        }, 300);
    });
};

export {
    statePreFetch
}