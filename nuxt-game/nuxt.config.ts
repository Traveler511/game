export default {
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/assets/styles/vars.scss" as *;`
                }
            }
        }
    }
}
