import { createSystem, defaultBaseConfig, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
    theme: {
        tokens: {
            colors: {
                brand: {
                }
            }
        }
    }
})

export const system = createSystem(defaultConfig, customConfig)