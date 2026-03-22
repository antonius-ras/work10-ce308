
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addTodo, toggleTodo, removeTodo, Todo } from '../redux/todoSlice';

const TodoScreen = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTodo = () => {
    if (!text.trim()) {
      Alert.alert('แจ้งเตือน', 'กรุณาพิมพ์ชื่องาน');
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text,
      completed: false,
    };

    dispatch(addTodo(newTodo));
    setText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ระบบ To-Do List</Text>
      
      <Text style={styles.summaryText}>จำนวนงานทั้งหมด: {todos.length} งาน</Text>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="เพิ่มงาน..." 
          value={text} 
          onChangeText={setText} 
        />
        <Button title="เพิ่มงาน" onPress={handleAddTodo} />
      </View>


      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>

            <TouchableOpacity 
              style={styles.todoTextContainer} 
              onPress={() => dispatch(toggleTodo(item.id))}
            >
              <Text style={[
                styles.todoText, 

                item.completed && styles.todoTextCompleted 
              ]}>
                {item.text}
              </Text>
            </TouchableOpacity>

            <View style={styles.deleteBtn}>
                <Button title="ลบ" color="#2196F3" onPress={() => dispatch(removeTodo(item.id))} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  summaryText: { fontSize: 16, marginBottom: 15, color: '#555', textAlign: 'center' },
  inputContainer: { marginBottom: 20, gap: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  todoItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee' },
  todoTextContainer: { flex: 1 },
  todoText: { fontSize: 16 },
  todoTextCompleted: { textDecorationLine: 'line-through', color: '#888' }, // สไตล์สำหรับขีดฆ่า
  deleteBtn: { marginLeft: 10 }
});

export default TodoScreen;