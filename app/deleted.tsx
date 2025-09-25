import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const DeletedScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const restoreTask = (id: string) => {
    LayoutAnimation.easeInEaseOut();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, deleted: false } : task
      )
    );
  };

  const renderItem = ({ item }: { item: Task }) => {
    if (!item.deleted) return null; // Only render deleted tasks

    return (
      <View style={styles.taskItem}>
        <Text style={styles.taskText}>{item.text}</Text>
        <TouchableOpacity onPress={() => restoreTask(item.id)} style={styles.restoreButton}>
          <Text style={styles.restoreButtonText}>Restaurar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks.filter(task => task.deleted)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
        ListEmptyComponent={<Text style={styles.emptyListText}>No hay tareas eliminadas.</Text>}
      <Text style={styles.title}>Tareas Eliminadas</Text>
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
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  restoreButton: {
    backgroundColor: '#6a5acd', // Medium violet
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  restoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default DeletedScreen;
