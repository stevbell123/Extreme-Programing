import { mount } from '@vue/test-utils'
import TaskList from '../components/TaskList.vue'
import { createPinia } from 'pinia'
import { describe, it, expect } from 'vitest'

describe('TaskList.vue', () => {
  it('menampilkan "No tasks yet" saat daftar kosong', () => {
    const wrapper = mount(TaskList, {
      global: {
        plugins: [createPinia()]  // Mock Pinia store
      }
    })
    expect(wrapper.text()).toContain('No tasks yet')
  })
  
})