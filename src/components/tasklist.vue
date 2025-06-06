<template>
  <div>
    <h2>Task List</h2>
    <div class="filter-controls">
      <label>Filter by Status:</label>
      <select v-model="filterStatus">
        <option value="all">All</option>
        <option value="to-do">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
    <ul v-if="filteredTasks.length > 0">
      <li v-for="task in filteredTasks" :key="task.id">
        {{ task.title }} (Status: {{ task.status }})
      </li>
    </ul>
    <p v-else>No tasks found</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()
const filterStatus = ref('all')

const filteredTasks = computed(() => {
  if (filterStatus.value === 'all') return taskStore.tasks
  return taskStore.tasks.filter(task => task.status === filterStatus.value)
})
</script>