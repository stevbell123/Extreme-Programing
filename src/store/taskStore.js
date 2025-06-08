import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const taskToEdit = ref(null)
  
  const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
  

  const loadFromLocalStorage = () => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      tasks.value = JSON.parse(savedTasks)
    }
  }
  
  // Untuk simulasi API (opsional)
  const fetchTasks = async () => {
    loadFromLocalStorage()
  }
  
  const addTask = (task) => {
    tasks.value.push(task)
    saveToLocalStorage()
  }
  
  const updateTask = (updatedTask) => {
    const index = tasks.value.findIndex(t => t.id === updatedTask.id)
    if (index !== -1) {
      tasks.value[index] = updatedTask
      saveToLocalStorage()
    }
  }
  
  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
    saveToLocalStorage()
  }
  
  const setTaskToEdit = (task) => {
    taskToEdit.value = task
  }
  
  return {
    tasks,
    taskToEdit,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    setTaskToEdit
  }
})