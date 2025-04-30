import React from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput 
} from "react-native";

const DynamicFormField = ({ field, value, onChange }) => {
  const { id, type, label, required } = field;
  
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <TextInput
            style={[styles.input, styles.textarea]}
            value={value || ""}
            onChangeText={(text) => onChange(id, text)}
            placeholder={`Enter ${label.toLowerCase()}`}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        );
      case "text":
      default:
        return (
          <TextInput
            style={styles.input}
            value={value || ""}
            onChangeText={(text) => onChange(id, text)}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      {renderInput()}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  required: {
    color: "#e63946",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  textarea: {
    height: 100,
  },
});

export default DynamicFormField;