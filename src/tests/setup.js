import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'

// Global Pinia instance
config.global.plugins = [[createPinia()]]