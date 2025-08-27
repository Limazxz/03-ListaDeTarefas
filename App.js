import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
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
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Nenhuma tarefa por aqui... Adicione uma tarefa!
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
