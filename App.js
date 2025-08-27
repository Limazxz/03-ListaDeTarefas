import { StatusBar } from "expo-status-bar";
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]); //estado para armazenar a lista de tarefas
  const [newTask, setNewTask] = useState(""); //estado para o texto da nova tarefa

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        savedTasks && setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.log("Erro ao carregar tarefas:", error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.log("Erro ao salvar tarefas:", error);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim().length > 0) {
      // corrigido: trim() antes de length
      //garante que a tarefa não seja vazia
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now().toString(), text: newTask, completed: false }, //cria uma nova tarefa com id unico
      ]);
      setNewTask(""); //limpa o input
      Keyboard.dismiss(); //fecha o teclado
    } else {
      Alert.alert("Erro", "A tarefa não pode ser vazia.");
    }
  };

  const toggleTaskCompleted = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
          },
        },
      ]
    );
  };

  const renderList = ({ item }) => (
    <View style={styles.taskItem} key={item.id}>
      <TouchableOpacity
        onPress={() => toggleTaskCompleted(item.id)}
        style={styles.taskTextContainer}
      >
        <Text
          style={[styles.taskText, item.completed && styles.completedTaskItem]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.taskText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.toBarTitle}>Minhas Tarefas</Text>
        <TouchableOpacity>
          <Text>🌛</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Tarefas do usuário */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar nova tarefa..."
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask} //adiciona a tarefa ao pressionar enter no teclado
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderList}
        // renderItem={({ item }) => (
        //    <View key={item.id} style={styles.taskItem}>
        //      <Text>{item.text}</Text>
        //      <TouchableOpacity>
        //        <Text>🗑️</Text>
        //     </TouchableOpacity>
        //  </View>
        // )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Nenhuma tarefa. Adicione uma nova tarefa!
          </Text>
        )}
        contentContainerStyle={styles.flatListContent}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
  },
  topBar: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBlockColor: "rgba(0,0,0,0.1)",
    padding: 20,
  },
  toBarTitle: {
    color: "#00796b",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    color: "#000",
    shadowColor: "#000",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    shadowColor: "#000",
  },
  input: {
    backgroundColor: "#fcfcfc",
    color: "#333",
    borderColor: "b0bec5",
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#009688",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  flatListContent: {
    paddingBottom: 10, // espalamento no final d Lista
  },
  taskItem: {
    backgroundColor: "#fff",
    color: "#333",
    borderColor: "rgba(0,0,0,0.1)",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    shadowColor: "#fff",
    borderWidth: 1,
  },
  taskTextContainer: {
    color: "#333",
    flex: 1, //permitir que o texto ocupe o espaço possível
    marginRight: 10,
  },
  taskText: {
    color: "#333",
    fontSize: 16,
    flexWrap: "wrap", // permite que o texto quebre linha
  },
  completedTaskItem: {
    textDecorationLine: "line-through", // riscar o texto
    opacity: 0.6,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#ff4444",
  },
  emptyListText: {
    color: "#9e9e9e",
    textAlign: "center",
    fontSize: 16,
    marginTop: 50,
    paddingHorizontal: 20,
  },
});
