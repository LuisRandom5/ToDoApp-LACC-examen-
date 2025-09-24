import React, { useState } from 'react';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const TodoApp: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>('');
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    // Función para agregar nueva tarea
    const addTask = () => {
        if (newTask.trim() !== '') {
            const task: Task = {
                id: Date.now(),
                text: newTask.trim(),
                completed: false
            };
            setTasks([...tasks, task]);
            setNewTask('');
        }
    };

    // Función para eliminar tarea
    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Función para marcar como completada
    const toggleComplete = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // Función para editar tarea
    const startEdit = (id: number, text: string) => {
        setEditingId(id);
        setEditText(text);
    };

    const saveEdit = () => {
        if (editText.trim() !== '') {
            setTasks(tasks.map(task =>
                task.id === editingId ? { ...task, text: editText.trim() } : task
            ));
        }
        setEditingId(null);
        setEditText('');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    // Estilos inline
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #4c1d95, #5b21b6, #7c3aed)',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        } as React.CSSProperties,
        header: {
            textAlign: 'center' as const,
            marginBottom: '30px'
        } as React.CSSProperties,
        title: {
            fontSize: '48px',
            color: 'white',
            margin: '0 0 10px 0'
        } as React.CSSProperties,
        subtitle: {
            color: '#c4b5fd',
            margin: 0
        } as React.CSSProperties,
        nav: {
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '30px'
        } as React.CSSProperties,
        navButton: {
            padding: '10px 20px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px'
        } as React.CSSProperties,
        activeNavButton: {
            padding: '10px 20px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px'
        } as React.CSSProperties,
        mainCard: {
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.2)'
        } as React.CSSProperties,
        inputContainer: {
            display: 'flex',
            gap: '10px',
            marginBottom: '30px'
        } as React.CSSProperties,
        input: {
            flex: 1,
            padding: '15px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '10px',
            color: 'white',
            fontSize: '16px'
        } as React.CSSProperties,
        addButton: {
            padding: '15px 20px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '18px'
        } as React.CSSProperties,
        taskItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '15px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
            marginBottom: '10px'
        } as React.CSSProperties,
        completedTask: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '15px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '10px',
            marginBottom: '10px',
            opacity: '0.6'
        } as React.CSSProperties,
        checkbox: {
            width: '20px',
            height: '20px',
            backgroundColor: 'transparent',
            border: '2px solid #c4b5fd',
            borderRadius: '50%',
            cursor: 'pointer'
        } as React.CSSProperties,
        checkedBox: {
            width: '20px',
            height: '20px',
            backgroundColor: '#4ade80',
            border: '2px solid #4ade80',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px'
        } as React.CSSProperties,
        taskText: {
            flex: 1,
            color: 'white',
            fontSize: '16px'
        } as React.CSSProperties,
        completedText: {
            flex: 1,
            color: 'white',
            fontSize: '16px',
            textDecoration: 'line-through'
        } as React.CSSProperties,
        editInput: {
            flex: 1,
            padding: '10px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px'
        } as React.CSSProperties,
        actionButton: {
            padding: '8px 12px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            marginLeft: '5px'
        } as React.CSSProperties,
        deleteButton: {
            padding: '8px 12px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            marginLeft: '5px'
        } as React.CSSProperties,
        saveButton: {
            padding: '8px 12px',
            backgroundColor: '#4ade80',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            marginLeft: '5px'
        } as React.CSSProperties,
        emptyState: {
            textAlign: 'center' as const,
            color: '#c4b5fd',
            fontSize: '18px',
            padding: '40px 0'
        } as React.CSSProperties,
        calendar: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '10px',
            marginTop: '20px'
        } as React.CSSProperties,
        calendarDay: {
            padding: '15px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            textAlign: 'center' as const,
            borderRadius: '8px',
            fontSize: '14px'
        } as React.CSSProperties,
        calendarHeader: {
            padding: '15px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#c4b5fd',
            textAlign: 'center' as const,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold'
        } as React.CSSProperties
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>✨ Mis Tareas</h1>
                <p style={styles.subtitle}>Organiza tu día de manera eficiente</p>
            </div>

            {/* Navegación simple */}
            <div style={styles.nav}>
                <button
                    style={!showCalendar ? styles.activeNavButton : styles.navButton}
                    onClick={() => setShowCalendar(false)}
                >
                    📝 Mis Tareas
                </button>
                <button
                    style={showCalendar ? styles.activeNavButton : styles.navButton}
                    onClick={() => setShowCalendar(true)}
                >
                    📅 Calendario
                </button>
            </div>

            <div style={styles.mainCard}>
                {!showCalendar ? (
                    // Vista de Tareas
                    <>
                        {/* Agregar nueva tarea */}
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                                placeholder="¿Qué necesitas hacer hoy?"
                                style={styles.input}
                            />
                            <button onClick={addTask} style={styles.addButton}>
                                ➕
                            </button>
                        </div>

                        {/* Lista de tareas */}
                        {tasks.length === 0 ? (
                            <div style={styles.emptyState}>
                                <div style={{fontSize: '48px', marginBottom: '10px'}}>📝</div>
                                ¡No hay tareas! Agrega una para empezar
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <div key={task.id} style={task.completed ? styles.completedTask : styles.taskItem}>
                                    <button
                                        onClick={() => toggleComplete(task.id)}
                                        style={task.completed ? styles.checkedBox : styles.checkbox}
                                    >
                                        {task.completed && '✓'}
                                    </button>

                                    {editingId === task.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                                                style={styles.editInput}
                                                autoFocus
                                            />
                                            <button onClick={saveEdit} style={styles.saveButton}>
                                                ✓
                                            </button>
                                            <button onClick={cancelEdit} style={styles.actionButton}>
                                                ✕
                                            </button>
                                        </>
                                    ) : (
                                        <>
                      <span style={task.completed ? styles.completedText : styles.taskText}>
                        {task.text}
                      </span>
                                            <button
                                                onClick={() => startEdit(task.id, task.text)}
                                                style={styles.actionButton}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                style={styles.deleteButton}
                                            >
                                                🗑️
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))
                        )}

                        {/* Estadísticas simples */}
                        {tasks.length > 0 && (
                            <div style={{marginTop: '30px', textAlign: 'center' as const, color: '#c4b5fd'}}>
                                Total: {tasks.length} | Completadas: {tasks.filter(t => t.completed).length} | Pendientes: {tasks.filter(t => !t.completed).length}
                            </div>
                        )}
                    </>
                ) : (
                    // Vista de Calendario (simple)
                    <>
                        <h2 style={{color: 'white', textAlign: 'center' as const, marginBottom: '20px'}}>
                            📅 Calendario - Septiembre 2025
                        </h2>
                        <div style={styles.calendar}>
                            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                                <div key={i} style={styles.calendarHeader}>{day}</div>
                            ))}
                            {Array.from({length: 30}, (_, i) => i + 1).map(day => (
                                <div key={day} style={styles.calendarDay}>
                                    {day}
                                </div>
                            ))}
                        </div>
                        <p style={{color: '#c4b5fd', textAlign: 'center' as const, marginTop: '20px', fontSize: '14px'}}>
                            📅 Vista de calendario - Solo visual por ahora
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoApp;