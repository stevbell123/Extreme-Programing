<template>
  <div class="task-item" :class="priorityClass">
    <div class="task-content">
      <h3>{{ task.title }}</h3>
      <p v-if="task.description">{{ task.description }}</p>
      <div class="task-meta">
        <span class="priority-badge">{{ task.priority }}</span>
        <span class="status-badge">{{ task.status }}</span>
      </div>
    </div>
    <div class="task-actions">
      <button @click="editTask" class="edit-btn">Edit</button>
      <button @click="deleteTask" class="delete-btn">Hapus</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const taskStore = useTaskStore();

const priorityClass = computed(() => {
  return {
    'low-priority': props.task.priority === 'low',
    'medium-priority': props.task.priority === 'medium',
    'high-priority': props.task.priority === 'high'
  };
});

const editTask = () => {
  taskStore.setTaskToEdit(props.task);
};

const deleteTask = () => {
  if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
    taskStore.deleteTask(props.task.id);
  }
};
</script>

<style scoped>
.task-item {
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-content {
  flex-grow: 1;
}

.task-content h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.task-content p {
  margin: 5px 0;
  color: #666;
}

.task-meta {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.priority-badge, .status-badge {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: bold;
}

.priority-badge {
  background: #e3f2fd;
  color: #1976d2;
}

.status-badge {
  background: #e8f5e9;
  color: #388e3c;
}

.task-actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

/* Priority classes */
.low-priority {
  border-left: 4px solid #4CAF50;
}

.medium-priority {
  border-left: 4px solid #FFC107;
}

.high-priority {
  border-left: 4px solid #F44336;
}
</style>