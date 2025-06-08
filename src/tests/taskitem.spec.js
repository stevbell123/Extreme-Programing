import { mount } from '@vue/test-utils'
import TaskItem from '../components/TaskItem.vue'
import { useTaskStore } from '../stores/taskStore'
import { createPinia } from 'pinia'
import { describe, it, expect } from 'vitest'

describe('TaskItem.vue', () => {
  it('memunculkan tombol edit dan hapus', () => {
    const wrapper = mount(TaskItem, {
      props: {
        task: {
          id: 1,
          title: 'Test Task',
          priority: 'medium',
          status: 'to-do'
        }
      },
      global: {
        plugins: [createPinia()]
      }
    })
    expect(wrapper.find('.edit-btn').exists()).toBe(true)
    expect(wrapper.find('.delete-btn').exists()).toBe(true)
  })
})  