import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const handleAddUser = async () => {
    if (!username || !city || !age || !email) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'users'), {
        username,
        city,
        age: parseInt(age),
        email,
        badges: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        profilePic: '',
        description: '',
        createdRide: [],
        joinedRide: [],
        firstName: '',
        lastName: '',
      });

      Alert.alert('Success', `User added with ID: ${docRef.id}`);
      // Reset form
      setUsername('');
      setCity('');
      setAge('');
      setEmail('');
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Error', 'Failed to add user.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-4 text-blue-400">Add User</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <Button title="Add User" onPress={handleAddUser} color="#1E90FF" />
    </View>
  );
}
