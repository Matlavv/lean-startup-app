import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { db } from '../../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CreateTravelConfirmation() {
  const params = useLocalSearchParams();
  const travelData = {
    departure: params.departure as string,
    destination: params.destination as string,
    date: params.date as string,
    time: params.time as string,
    price: params.price as string,
  };

  const handleCreateTravel = async () => {
    try {
      const ridesCollection = collection(db, 'rides');
      const newRide = {
        driverId: '1',
        availableSeats: 2,
        comfortLevel: 'basic',
        createdAt: Timestamp.now(),
        date: travelData.date,
        time: travelData.time,
        departure: travelData.departure,
        destination: travelData.destination,
        isActive: true,
        passengers: [],
        price: Number(travelData.price),
        sharedPlaylist: '',
        updatedAt: Timestamp.now(),
      };

      await addDoc(ridesCollection, newRide);
      router.push('/(tabs)/travel');
    } catch (error) {
      console.error('Error creating travel:', error);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-primary-pink text-4xl font-bold">RutaFem</Text>
      </View>

      {/* Steps */}
      <View className="flex-row justify-center items-center mb-8">
        <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center">
          <Text className="text-white text-xl font-bold">1</Text>
        </View>
        <View className="w-20 h-0.5 bg-gray-300" />
        <View className="w-12 h-12 rounded-full bg-primary-pink items-center justify-center">
          <Text className="text-white text-xl font-bold">2</Text>
        </View>
      </View>

      <Text className="text-2xl font-bold text-primary-black mb-8">
        Confirmation du trajet
      </Text>

      {/* Travel Summary */}
      <View className="space-y-4 bg-gray-50 p-6 rounded-lg">
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Départ :</Text>
          <Text className="text-primary-black font-semibold">
            {travelData.departure}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500">Arrivée :</Text>
          <Text className="text-primary-black font-semibold">
            {travelData.destination}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500">Date :</Text>
          <Text className="text-primary-black font-semibold">
            {travelData.date}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500">Heure :</Text>
          <Text className="text-primary-black font-semibold">
            {travelData.time}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500">Prix :</Text>
          <Text className="text-primary-black font-semibold">
            {travelData.price}€
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View className="mt-auto space-y-4">
        <TouchableOpacity
          className="bg-primary-pink rounded-full py-4 items-center"
          onPress={handleCreateTravel}
        >
          <Text className="text-white text-lg font-semibold">Confirmer</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="absolute top-4 left-4"
        onPress={() => router.back()}
      >
        <Text className="text-2xl">←</Text>
      </TouchableOpacity>
    </View>
  );
}
