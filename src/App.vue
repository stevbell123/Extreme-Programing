<template>
  <div class="app-container">
    <header class="app-header">
      <h1>TaskEasy</h1>
      <p>Aplikasi Manajemen Tugas Sederhana</p>
    </header>

    <main class="app-main">
      <div class="task-form-container">
        <TaskForm />
      </div>

      <div class="task-list-container">
        <h2>Daftar Tugas</h2>
        <div class="sort-controls">
          <label>Urutkan berdasarkan:</label>
          <select v-model="sortBy">
            <option value="priority">Prioritas</option>
            <option value="title">Judul</option>
            <option value="status">Status</option>
          </select>
        </div>
        
        <div v-if="loading" class="loading">Memuat tugas...</div>
        <div v-else-if="sortedTasks.length === 0" class="empty-state">
          Tidak ada tugas. Tambahkan tugas baru!
        </div>
        <ul v-else class="task-list">
          <li v-for="task in sortedTasks" :key="task.id">
            <TaskItem :task="task" />
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from './stores/taskStore';
import TaskForm from './components/TaskForm.vue';
import TaskItem from './components/TaskItem.vue';

const taskStore = useTaskStore();
const sortBy = ref('priority');
const loading = ref(true);

// Ambil data tugas saat komponen dimount
onMounted(async () => {
  try {
    await taskStore.fetchTasks();
  } finally {
    loading.value = false;
  }
});

// Daftar tugas yang sudah diurutkan
const sortedTasks = computed(() => {
  const tasks = [...taskStore.tasks];
  
  switch (sortBy.value) {
    case 'title':
      return tasks.sort((a, b) => a.title.localeCompare(b.title));
    case 'status':
      return tasks.sort((a, b) => a.status.localeCompare(b.status));
    case 'priority':
    default:
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }
});
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e1e5eb;
}

.app-header h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 2.5rem;
  font-weight: 600;
}

.app-header p {
  color: #7f8c8d;
  margin: 0.5rem 0 0;
  font-size: 1.1rem;
}

.app-main {
  display: grid;
  grid-template-columns: 300px 1fr; /* Lebih proporsional */
  gap: 2rem;
  align-items: start;
}

.task-form-container {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.task-list-container {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.task-list-container h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.sort-controls {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sort-controls label {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.sort-controls select {
  padding: 0.5rem;
  border: 1px solid #e1e5eb;
  border-radius: 6px;
  background-color: #ffffff;
  font-size: 0.9rem;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.loading, .empty-state {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .app-main {
    grid-template-columns: 1fr;
  }
  
  .app-container {
    padding: 1.5rem;
  }
}
</style>