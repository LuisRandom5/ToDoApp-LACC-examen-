import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router'; // Changed from useNavigation
import AsyncStorage from '@react-native-async-storage/async-storage'; // For persistence

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
  deleted: boolean;
}

const HomeScreen = () => {
  const router = useRouter(); // Changed from useNavigation
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const addTask = () => {
    if (newTask.trim().length > 0) {
      LayoutAnimation.easeInEaseOut(); // Animation for new item
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: newTask.trim(), completed: false, deleted: false },
      ]);
      setNewTask('');
    } else {
      Alert.alert('Error', 'La tarea no puede estar vacía.');
    }
  };

  const toggleComplete = (id: string) => {
    LayoutAnimation.easeInEaseOut();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const softDeleteTask = (id: string) => {
    LayoutAnimation.easeInEaseOut();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, deleted: true } : task
      )
    );
  };

  const shareTask = async (taskText: string) => {
    try {
      await Share.share({
        message: `Mi Tarea: ${taskText}`,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const renderItem = ({ item }: { item: Task }) => {
    if (item.deleted) return null; // Don't render deleted tasks on home screen

    return (
      <View style={styles.taskItem}>
        <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.taskTextContainer}>
          <Text style={[styles.taskText, item.completed && styles.completedTask]}>
            {item.text}
          </Text>
        </TouchableOpacity>
        <View style={styles.taskActions}>
          <TouchableOpacity onPress={() => shareTask(item.text)} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Compartir</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => softDeleteTask(item.id)} style={[styles.actionButton, styles.deleteButton]}>
            <Text style={styles.actionButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/calendar')} // Changed navigation call
        >
          <Text style={styles.navButtonText}>Calendario</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/deleted')} // Changed navigation call
        >
          <Text style={styles.navButtonText}>Tareas Eliminadas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Añadir nueva tarea..."
          placeholderTextColor="#ccc"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Añadir</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks.filter(task => !task.deleted)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
        ListEmptyComponent={<Text style={styles.emptyListText}>¡Aún no hay tareas! Añade algunas.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e4f7', // Light violet background
    padding: 10,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  navButton: {
    backgroundColor: '#8a2be2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#8a2be2',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskActions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#6a5acd', // Medium violet
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#dc143c', // Crimson for delete
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;