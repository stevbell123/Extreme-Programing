import { mount } from '@vue/test-utils'
import TaskForm from '../components/TaskForm.vue'
import { useTaskStore } from '../stores/taskStore'
import { createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

describe('TaskForm.vue', () => {
  let pinia
  let taskStore

  beforeEach(() => {
    pinia = createPinia()
    taskStore = useTaskStore(pinia)
  })

  it('memvalidasi input judul wajib diisi', async () => {
    const wrapper = mount(TaskForm, {
      global: {
        plugins: [pinia]
      }
    })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.find('#title').classes()).toContain('error')
  })

  it('menambahkan task baru saat form disubmit', async () => {
    const wrapper = mount(TaskForm, {
      global: {
        plugins: [pinia]
      }
    })
    await wrapper.find('#title').setValue('Tugas Baru')
    await wrapper.find('form').trigger('submit.prevent')
    expect(taskStore.tasks).toHaveLength(1)
  })
})