<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <div class="form-group">
      <label for="title">Judul Tugas:</label>
      <input 
        type="text" 
        id="title" 
        v-model="newTask.title" 
        required 
        placeholder="Buat laporan"
      />
    </div>

    <div class="form-group">
      <label for="description">Deskripsi:</label>
      <textarea 
        id="description" 
        v-model="newTask.description" 
        placeholder="Detail tugas..."
      ></textarea>
    </div>

    <div class="form-group">
      <label>Prioritas:</label>
      <div class="priority-options">
        <label v-for="priority in priorities" :key="priority">
          <input 
            type="radio" 
            v-model="newTask.priority" 
            :value="priority" 
            required
          />
          {{ priority }}
        </label>
      </div>
    </div>

    <div class="form-group">
      <label>Status:</label>
      <select v-model="newTask.status" required>
        <option v-for="status in statuses" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </div>

    <button type="submit" class="submit-btn">
      {{ editingTask ? 'Update' : 'Tambahkan' }} Tugas
    </button>
    <button v-if="editingTask" @click="cancelEdit" type="button" class="cancel-btn">
      Batal
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();
const priorities = ['low', 'medium', 'high'];
const statuses = ['to-do', 'in-progress', 'done'];

const newTask = ref({
  id: null,
  title: '',
  description: '',
  priority: 'medium',
  status: 'to-do'
});

const editingTask = ref(false);

// Jika ada task yang diedit
watch(() => taskStore.taskToEdit, (task) => {
  if (task) {
    newTask.value = { ...task };
    editingTask.value = true;
  }
});

const handleSubmit = () => {
  if (editingTask.value) {
    taskStore.updateTask(newTask.value);
  } else {
    taskStore.addTask({
      ...newTask.value,
      id: Date.now() // Generate simple ID
    });
  }
  resetForm();
};

const cancelEdit = () => {
  taskStore.setTaskToEdit(null);
  resetForm();
};

const resetForm = () => {
  newTask.value = {
    id: null,
    title: '',
    description: '',
    priority: 'medium',
    status: 'to-do'
  };
  editingTask.value = false;
};
</script>

<style scoped>
.task-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"], 
textarea, 
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 80px;
}

.priority-options {
  display: flex;
  gap: 15px;
  margin-top: 5px;
}

.priority-options label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: normal;
}

button {
  padding: 8px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}
</style>