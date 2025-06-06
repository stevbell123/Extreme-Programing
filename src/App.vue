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
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.app-header h1 {
  color: #2c3e50;
  margin: 0;
}

.app-header p {
  color: #7f8c8d;
  margin: 5px 0 0;
}

.app-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
}

.task-form-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.task-list-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.sort-controls {
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-controls select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  margin-bottom: 10px;
}

.loading, .empty-state {
  text-align: center;
  padding: 20px;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .app-main {
    grid-template-columns: 1fr;
  }
}
</style>