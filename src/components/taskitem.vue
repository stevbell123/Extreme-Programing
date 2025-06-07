<template>
  <div class="task-card" :class="priorityClass">
    <div class="task-content-wrapper">
      <div class="task-main-content">
        <h3 class="task-title">{{ task.title }}</h3>
        <p v-if="task.description" class="task-description">{{ task.description }}</p>
      </div>
      
      <div class="task-meta">
        <span class="priority-tag">{{ formattedPriority }}</span>
        <span class="status-tag">{{ formattedStatus }}</span>
      </div>
    </div>
    
    <div class="task-actions">
      <button @click="editTask" class="action-btn edit-btn" aria-label="Edit task">
        <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
        </svg>
      </button>
      <button @click="deleteTask" class="action-btn delete-btn" aria-label="Delete task">
        <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
        </svg>
      </button>
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

const formattedPriority = computed(() => {
  return props.task.priority.charAt(0).toUpperCase() + props.task.priority.slice(1);
});

const formattedStatus = computed(() => {
  return props.task.status.replace('-', ' ');
});

const priorityClass = computed(() => {
  return {
    'priority-high': props.task.priority === 'high',
    'priority-medium': props.task.priority === 'medium',
    'priority-low': props.task.priority === 'low'
  };
});

const editTask = () => {
  taskStore.setTaskToEdit(props.task);
};

const deleteTask = () => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(props.task.id);
  }
};
</script>

<style scoped>
.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.task-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background: var(--priority-color);
}

.task-content-wrapper {
  flex: 1;
  min-width: 0;
  padding-right: 1rem;
}

.task-main-content {
  margin-bottom: 0.75rem;
}

.task-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-description {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-meta {
  display: flex;
  gap: 0.75rem;
}

.priority-tag,
.status-tag {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
}

.priority-tag {
  background-color: var(--priority-bg);
  color: var(--priority-text);
}

.status-tag {
  background-color: #f3f4f6;
  color: #4b5563;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.action-btn:hover {
  transform: scale(1.1);
}

.edit-btn {
  background-color: #e0e7ff;
  color: #4f46e5;
}

.delete-btn {
  background-color: #fee2e2;
  color: #ef4444;
}

/* Priority Colors */
.priority-high {
  --priority-color: #ef4444;
  --priority-bg: #fee2e2;
  --priority-text: #b91c1c;
}

.priority-medium {
  --priority-color: #f59e0b;
  --priority-bg: #fef3c7;
  --priority-text: #b45309;
}

.priority-low {
  --priority-color: #10b981;
  --priority-bg: #d1fae5;
  --priority-text: #047857;
}

/* Responsive Design */
@media (max-width: 640px) {
  .task-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
  
  .task-content-wrapper {
    padding-right: 0;
    margin-bottom: 0.75rem;
    width: 100%;
  }
  
  .task-actions {
    align-self: flex-end;
  }
  
  .task-meta {
    margin-top: 0.5rem;
  }
}
</style>