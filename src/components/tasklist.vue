<template>
  <div class="task-manager">
    <!-- Add New Task Form (top section) -->
    <div class="add-task-form">
      <h2>Add New Task</h2>
      <form @submit.prevent="addNewTask">
        <div class="form-group">
          <label>Title *</label>
          <input 
            type="text" 
            v-model="newTask.title" 
            required 
            placeholder="Enter task title"
          />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea 
            v-model="newTask.description" 
            placeholder="Enter task description (optional)"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Priority *</label>
          <select v-model="newTask.priority" required>
            <option value="">Select priority level</option>
            <option v-for="priority in priorities" :key="priority" :value="priority">
              {{ priority }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Status *</label>
          <select v-model="newTask.status" required>
            <option value="">Select task status</option>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>

        <button type="submit" class="add-btn">Add Task</button>
      </form>
    </div>

    <!-- Task List Section -->
    <div class="task-list-section">
      <h2>Task List ({{ taskStore.tasks.length }} task{{ taskStore.tasks.length !== 1 ? 's' : '' }})</h2>
      
      <!-- Task Items -->
      <div v-for="task in taskStore.tasks" :key="task.id" class="task-item">
        <div class="task-content">
          <h3>{{ task.title }}</h3>
          <p v-if="task.description">{{ task.description }}</p>
          <div class="task-meta">
            <span class="priority-badge">{{ task.priority }}</span>
            <span class="status-badge">{{ task.status }}</span>
          </div>
        </div>
        <div class="task-actions">
          <button @click="startEditing(task)" class="edit-btn">Edit</button>
          <button @click="deleteTask(task.id)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>

    <!-- Edit Form (separate section at bottom) -->
    <div v-if="editingTask" class="edit-task-form">
      <h2>Edit Task</h2>
      <form @submit.prevent="updateTask">
        <div class="form-group">
          <label>Title *</label>
          <input 
            type="text" 
            v-model="editingTask.title" 
            required 
          />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model="editingTask.description"></textarea>
        </div>

        <div class="form-group">
          <label>Priority *</label>
          <select v-model="editingTask.priority" required>
            <option v-for="priority in priorities" :key="priority" :value="priority">
              {{ priority }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Status *</label>
          <select v-model="editingTask.status" required>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="save-btn">Save</button>
          <button type="button" class="cancel-btn" @click="cancelEdit">Cancel</button>
        </div>
      </form>
    </div>

    <p class="save-notice">Your tasks are automatically saved to your browser</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();
const priorities = ['high', 'medium', 'low'];
const statuses = ['to-do', 'in-progress', 'done'];

const newTask = ref({
  title: '',
  description: '',
  priority: '',
  status: ''
});

const editingTask = ref(null);

const addNewTask = () => {
  taskStore.addTask({
    ...newTask.value,
    id: Date.now()
  });
  newTask.value = { title: '', description: '', priority: '', status: '' };
};

const startEditing = (task) => {
  // Scroll to bottom where edit form is located
  editingTask.value = { ...task };
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, 100);
};

const updateTask = () => {
  taskStore.updateTask(editingTask.value);
  editingTask.value = null;
};

const cancelEdit = () => {
  editingTask.value = null;
};

const deleteTask = (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(id);
  }
};
</script>

<style scoped>
.task-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.add-task-form, .edit-task-form {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.task-list-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

h2 {
  color: #333;
  margin-top: 0;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"], textarea, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  min-height: 80px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.add-btn {
  background-color: #4CAF50;
  color: white;
}

.save-btn {
  background-color: #2196F3;
  color: white;
  margin-right: 10px;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.task-content h3 {
  margin: 0 0 5px 0;
}

.task-meta {
  margin-top: 10px;
}

.priority-badge, .status-badge {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-right: 5px;
}

.priority-badge {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge {
  background: #e3f2fd;
  color: #1565c0;
}

.edit-btn {
  background-color: #FFC107;
  color: #333;
  margin-right: 5px;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.save-notice {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-top: 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}
</style>