import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';

export default function CreateTravel() {
  const [travelData, setTravelData] = useState({
    departure: '',
    destination: '',
    date: '',
    time: '',
    price: '',
  });

  return (
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-primary-pink text-4xl font-bold">RutaFem</Text>
      </View>

      {/* Steps */}
      <View className="flex-row justify-center items-center mb-8">
        <View className="w-12 h-12 rounded-full bg-primary-pink items-center justify-center">
          <Text className="text-white text-xl font-bold">1</Text>
        </View>
        <View className="w-20 h-0.5 bg-gray-300" />
        <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center">
          <Text className="text-white text-xl font-bold">2</Text>
        </View>
      </View>

      <Text className="text-2xl font-bold text-primary-black mb-8">
        Créer un trajet
      </Text>

      {/* Forms */}
      <View className="space-y-4">
        <View className="border border-gray-300 rounded-lg p-4">
          <TextInput
            placeholder="Ville de départ"
            value={travelData.departure}
            onChangeText={(text) =>
              setTravelData({ ...travelData, departure: text })
            }
            className="text-gray-700"
          />
        </View>

        <View className="border border-gray-300 rounded-lg p-4">
          <TextInput
            placeholder="Ville d'arrivée"
            value={travelData.destination}
            onChangeText={(text) =>
              setTravelData({ ...travelData, destination: text })
            }
            className="text-gray-700"
          />
        </View>

        <View className="border border-gray-300 rounded-lg p-4">
          <TextInput
            placeholder="Date de départ"
            value={travelData.date}
            onChangeText={(text) =>
              setTravelData({ ...travelData, date: text })
            }
            className="text-gray-700"
          />
        </View>

        <View className="border border-gray-300 rounded-lg p-4">
          <TextInput
            placeholder="Heure de départ"
            value={travelData.time}
            onChangeText={(text) =>
              setTravelData({ ...travelData, time: text })
            }
            className="text-gray-700"
          />
        </View>

        <View className="border border-gray-300 rounded-lg p-4">
          <TextInput
            placeholder="Prix"
            value={travelData.price}
            onChangeText={(text) =>
              setTravelData({ ...travelData, price: text })
            }
            keyboardType="numeric"
            className="text-gray-700"
          />
        </View>
      </View>

      {/* Continue & go back*/}
      <View className="mt-auto">
        <TouchableOpacity
          className="bg-primary-pink rounded-full py-4 items-center"
          onPress={() => {
            router.push({
              pathname: '/travel/createTravelConfirmation',
              params: travelData,
            });
          }}
        >
          <Text className="text-white text-lg font-semibold">Continuer</Text>
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
