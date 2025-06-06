import { useTaskStore } from '../stores/taskStore'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Task Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('menambahkan task baru', () => {
    const store = useTaskStore()
    store.addTask({ id: 1, title: 'Task 1' })
    expect(store.tasks).toHaveLength(1)
  })

  it('menghapus task', () => {
    const store = useTaskStore()
    store.addTask({ id: 1, title: 'Task 1' })
    store.deleteTask(1)
    expect(store.tasks).toHaveLength(0)
  })
})