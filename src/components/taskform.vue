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
import { useTaskStore } from '../store/taskStore';

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
      id: Date.now() 
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
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

input, textarea, select {
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
}

.form-group {
  margin-bottom: 1.25rem;
}


.submit-btn, .cancel-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn {
  background-color: #4f46e5;
  color: white;
}

.submit-btn:hover {
  background-color: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cancel-btn {
  background-color: #f1f5f9;
  color: #64748b;
  margin-left: 0.75rem;
}

.cancel-btn:hover {
  background-color: #e2e8f0;
}

.submit-btn .icon, .cancel-btn .icon {
  width: 18px;
  height: 18px;
}


label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.95rem;
}

input[type="text"], 
textarea, 
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e1e5eb;
  border-radius: 6px;
  font-size: 0.95rem;
  background-color: #ffffff;
}

textarea {
  height: 100px;
  resize: vertical;
}

.priority-options {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.priority-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e2e8f0;
  font-size: 0.95rem;
}

.priority-option:hover {
  border-color: #cbd5e1;
}

.priority-option.active {
  background: #e0e7ff;
  border-color: #818cf8;
  color: #4f46e5;
  font-weight: 500;
}

.custom-radio {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #94a3b8;
  position: relative;
  transition: all 0.2s;
}

.active .custom-radio {
  border-color: #4f46e5;
  background-color: #4f46e5;
}

.active .custom-radio::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

/* Untuk tampilan mobile */
@media (max-width: 640px) {
  .priority-options {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .priority-option {
    width: 100%;
  }
}
</style>
